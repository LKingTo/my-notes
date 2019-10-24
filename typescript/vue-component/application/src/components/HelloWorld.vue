<template>
  <div class="hello">
    <h3>Vue-cli3.0 - Typescript装饰器运用</h3>
    <h5>{{ msg }}</h5>
    <p>【prop】propA: {{propA}}</p>
    <p>【prop】propB: {{propB}}</p>
    <p>【prop】propC: {{JSON.stringify(propC)}}</p>
    <p>【mixins】globalVal: {{globalVal}}</p>
    <p>【data】number1: {{ number1 }}</p>
    <p>【computed】number2: {{ number2 }}</p>
    <p>【watch】child: {{child}}</p>
    <p>【watch】person.name: {{person.name}}; person.age: {{person.age}}</p>
    <button @click="changeWatch()">改变监听的属性值</button>
  </div>
</template>

<script lang="ts">
  /**
   * 参考文献：https://www.jianshu.com/p/d8ed3aa76e9b
   */
  import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator'
  import myMixins from '@/mixins/mixins'

  // 定义接口
  interface Person {
    readonly id: number; // 只读属性
    name: string;
    age?: number; // “?” - 可选属性
    [propName: string]: any; // 任意属性
  }

  @Component({
    mixins: [myMixins]
  })
  export default class HelloWorld extends Vue {
    /**  @Prop start*****/
    @Prop() private msg!: string; // private - 私有属性，不可外部更改
    @Prop(Number) propA!: number; // ! - 表示必定有值
    @Prop({ default: 'default propB' }) propB!: string;
    @Prop([ String, Boolean ]) propC: string | boolean | undefined;
    /**  @Prop end*****/

    // data属性
    number1: number = 1;
    child: string = 'baby';
    person: Person = {
      id: 9527,
      name: 'police',
      age: 28
    };

    /** *** computed start*****/
    // 计算属性computed
    get number2 () {
      return this.number1 + 3
    }

    /** *** computed end*****/

    /** *** @Watch start*****/
    @Watch('child')
    onChangeChild (newVal: string, oldVal: string) {
      console.log('watch [child] change:', newVal)
    }
    @Watch('person', { immediate: true, deep: true })
    onChangeValue (newVal: Person, oldVal: Person) {
      console.log('watch [person] change:', newVal)
    }
    changeWatch () {
      this.child = 'toto'
      this.person.age = 29
    }

    /** *** @Watch end*****/

    /** *** @Emit start*****/
    mounted () {
      // 监听事件
      this.$on('emit-to-do', (n: string) => {
        console.log(n)
      })
      this.$on('reset', () => {
        console.log('do reset')
      })
      // 触发事件
      this.emitToDo('emit')
    }

    @Emit('reset') // 传参，触发指定事件名的函数
    @Emit() // 不传参数，默认触发所修饰的函数名
    emitToDo (n: string) {
      console.log('默认执行命令') // 事件回调默认执行命令
      // 之后执行this.$emit
    }
  /** *** @Emit end*****/
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
