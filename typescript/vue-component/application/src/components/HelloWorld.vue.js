import * as tslib_1 from "tslib";
/**
 * 参考文献：https://www.jianshu.com/p/d8ed3aa76e9b
 */
import { Component, Prop, Emit, Watch, Vue } from 'vue-property-decorator';
import myMixins from '@/mixins/mixins';
let HelloWorld = class HelloWorld extends Vue {
    constructor() {
        super(...arguments);
        /**  @Prop end*****/
        // data属性
        this.number1 = 1;
        this.child = 'baby';
        this.person = {
            id: 9527,
            name: 'police',
            age: 28
        };
        /** *** @Emit end*****/
    }
    /** *** computed start*****/
    // 计算属性computed
    get number2() {
        return this.number1 + 3;
    }
    /** *** computed end*****/
    /** *** @Watch start*****/
    onChangeChild(newVal, oldVal) {
        console.log('watch [child] change:', newVal);
    }
    onChangeValue(newVal, oldVal) {
        console.log('watch [person] change:', newVal);
    }
    changeWatch() {
        this.child = 'toto';
        this.person.age = 29;
    }
    /** *** @Watch end*****/
    /** *** @Emit start*****/
    mounted() {
        // 监听事件
        this.$on('emit-to-do', (n) => {
            console.log(n);
        });
        this.$on('reset', () => {
            console.log('do reset');
        });
        // 触发事件
        this.emitToDo('emit');
    }
    emitToDo(n) {
        console.log('默认执行命令'); // 事件回调默认执行命令
        // 之后执行this.$emit
    }
};
tslib_1.__decorate([
    Prop()
], HelloWorld.prototype, "msg", void 0);
tslib_1.__decorate([
    Prop(Number)
], HelloWorld.prototype, "propA", void 0);
tslib_1.__decorate([
    Prop({ default: 'default propB' })
], HelloWorld.prototype, "propB", void 0);
tslib_1.__decorate([
    Prop([String, Boolean])
], HelloWorld.prototype, "propC", void 0);
tslib_1.__decorate([
    Watch('child')
], HelloWorld.prototype, "onChangeChild", null);
tslib_1.__decorate([
    Watch('person', { immediate: true, deep: true })
], HelloWorld.prototype, "onChangeValue", null);
tslib_1.__decorate([
    Emit('reset') // 传参，触发指定事件名的函数
    ,
    Emit() // 不传参数，默认触发所修饰的函数名
], HelloWorld.prototype, "emitToDo", null);
HelloWorld = tslib_1.__decorate([
    Component({
        mixins: [myMixins]
    })
], HelloWorld);
export default HelloWorld;
//# sourceMappingURL=HelloWorld.vue.js.map