


//
// function getArgs(func) {
//   // 首先匹配函数括弧里的参数
//   var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
//
//   // 分解参数成数组
//   return args.split(",").map(function(arg) {
//     // 去空格和内联注释
//     return arg.replace(/\/\*.*\*\//, "").trim();
//   }).filter(function(arg) {
//     // 确保没有undefineds
//     return arg;
//   });
// }
// var a = 1
// var cc  = function myCustomFn() {
//
// }
//
// console.log(getArgs(cc))
var foo = [
  v2=1
];




// 它通过一个如下所示的javascript字典：



// {foo : "bar"}

// 当yourfunction(被执行时，解包名称和值thustly：



yourfunction = function(dict) {

  var name = Object.keys(dict)[0];

  var value = dict[name];

  console.log(name);        //prints foo

  console.log(value);       //prints bar

}
yourfunction({foo});
