// mixins.ts,定义vue/type/vue模块,实现Vue接口
import { Vue, Component } from 'vue-property-decorator'

declare module 'vue/types/vue' {
  interface Vue {
    globalVal: string;
  }
}

@Component
export default class myMixins extends Vue {
  globalVal: string = '全局混合属性';
}
