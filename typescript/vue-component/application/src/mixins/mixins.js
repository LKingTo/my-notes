import { __decorate } from "tslib";
// mixins.ts,定义vue/type/vue模块,实现Vue接口
import { Vue, Component } from 'vue-property-decorator';
let myMixins = class myMixins extends Vue {
    constructor() {
        super(...arguments);
        this.globalVal = '全局混合属性';
    }
};
myMixins = __decorate([
    Component
], myMixins);
export default myMixins;
//# sourceMappingURL=mixins.js.map