const STRATEGY_ID = {
  GFFUND: "gffund",
  JSFUND: "jsfund",
  MONEY: "moneyfund",
  PENSION: "Pension",
  EDU: "Education",
  BABY: "Baby",
  PURCHASE: "Purchase",
  ALLOC_RISK3P12: "allocation.risk3p12", // 全球猎手
  BLMODEL: "blmodel", // 全球猎手
  RP: "riskparity",	//天秤均衡
  RP_PLUS: "riskparityplus",	//步步为营（风险均衡增强）
  TAA: "taa",	//趋势为王
  SMART: "smartfund",	//智选基金
  BIG_SMALL_CAP: "bigsmallcap", //广发三剑客
  CONT_MARKETING: "contmarketing",	// 成长先锋
  FIXED_INCOME_PLUS: "fixedincomeplus",	// 日薪月益
  ZO_STAR: "zostar",	// 中欧全明星
  SURFING: "surfing",	// 择时优选
  THEME: "theme",	// 主题选基
};

// 并发请求限制
function multiRequest(urls = [], maxNum) {
  // 请求总数量
  const len = urls.length;
  // 根据请求数量创建一个数组来保存请求的结果
  const result = new Array(len).fill(false);
  // 当前完成的数量
  let count = 0;

  return new Promise((resolve, reject) => {
    // 请求maxNum个
    while (count < maxNum) {
      next();
    }
    function next() {
      let current = count++;
      // 处理边界条件
      if (current >= len) {
        // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
        !result.includes(false) && resolve(result);
        return;
      }
      const url = urls[current];
      console.log(`开始 ${current}`, new Date().toLocaleString());
      fetch(url)
        .then((res) => {
          // 保存请求结果
          result[current] = res;
          console.log(`完成 ${current}`, new Date().toLocaleString());
          // 请求没有全部完成, 就递归
          if (current < len) {
            next();
          }
        })
        .catch((err) => {
          console.log(`结束 ${current}`, new Date().toLocaleString());
          result[current] = err;
          // 请求没有全部完成, 就递归
          if (current < len) {
            next();
          }
        });
    }
  });
}

const urls = Object.keys(STRATEGY_ID).map(id => `http://robotdev.gf.com.cn:32003/api/robot/investment/2.0.0/strategy/${STRATEGY_ID[id]}`)
multiRequest(urls, 3)
