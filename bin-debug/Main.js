//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")
                            //this.startAnimation(result);
                        ];
                    case 2:
                        result = _a.sent();
                        //this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        //this.startAnimation(result);
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var bg = new egret.Shape(); //建立一个egret.Shape对象bg,egret.Shape对象有图形绘制功能
        bg.graphics.beginFill(0x336699); //定义图形的填充颜色
        bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight); //绘制矩形
        bg.graphics.endFill(); //结束绘制工作
        this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH; //调整屏幕适配模式
        _super.prototype.addChild.call(this, bg); //添加到显示结构中，才可以在运行时显示出来
        //addChild，这是Egret引擎操作显示列表的一个最常用的方法，就是将某个显示对象添加到某个显示容器上
        var tx = new egret.TextField(); //egret.TextField显示文字
        tx.text = "随便玩玩";
        tx.size = 32;
        _super.prototype.addChild.call(this, tx);
        tx.x = 20; //设置锚点
        tx.y = 20;
        tx.width = this.stage.stageWidth - 40;
        tx.touchEnabled = true; //允许该显示对象响应Touch事件
        tx.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            tx.textColor = 0x00ff00;
        }, this); //事件处理函数
        //console.log( "createGameScene", RES.getRes("123_png") );
        var zhixi = new egret.Bitmap(RES.getRes("123_png")); //在构造函数中传入RES载入的资源
        zhixi.x = 0; //设置锚点
        zhixi.y = 0;
        this.addChild(zhixi);
        var taiji1 = new egret.Bitmap(RES.getRes("1起势_jpg"));
        taiji1.x = 50;
        taiji1.y = 50;
        this.addChild(taiji1);
        taiji1.width = 360;
        taiji1.height = 640;
        var taiji2 = new egret.Bitmap(RES.getRes("2左右野马分鬃_jpg"));
        taiji2.x = 100;
        taiji2.y = 100;
        this.addChild(taiji2);
        taiji2.width = 360;
        taiji2.height = 640;
        var taiji3 = new egret.Bitmap(RES.getRes("3白鹤亮翅_jpg"));
        taiji3.x = 150;
        taiji3.y = 150;
        this.addChild(taiji3);
        taiji3.width = 360;
        taiji3.height = 640;
        this.setChildIndex(zhixi, this.getChildIndex(taiji1)); //设置深度
        this.swapChildren(taiji2, taiji3); //交换深度
        this.setChildIndex(zhixi, 20);
        console.log("display indexes:", this.getChildIndex(zhixi), this.getChildIndex(taiji1), this.getChildIndex(taiji2), this.getChildIndex(taiji3)); //显示当前深度
        //根据锚点的偏移修改坐标值
        zhixi.anchorOffsetX = 30;
        zhixi.anchorOffsetY = 40;
        zhixi.x += 30;
        zhixi.y += 40;
        //点击次数控制代码
        this.times = -1;
        var self = this;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            switch (++self.times % 3) {
                case 0:
                    //第一步：让两个图片互换，直接设置目标X坐标为对方的当前X坐标即可：
                    egret.Tween.get(taiji1).to({ x: taiji3.x }, 300, egret.Ease.circIn);
                    egret.Tween.get(taiji3).to({ x: taiji1.x }, 300, egret.Ease.circIn);
                    break;
                case 1:
                    //第二步：实现图片的透明度变为0.3，之后再恢复为1。
                    egret.Tween.get(taiji2).to({ alpha: .3 }, 300, egret.Ease.circIn).to({ alpha: 1 }, 300, egret.Ease.circIn);
                    break;
                case 2:
                    //第三步：
                    egret.Tween.get(zhixi).to({ scaleX: .4, scaleY: .4 }, 500, egret.Ease.circIn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.circIn);
                    break;
            }
        }, this);
        var sound = RES.getRes("bgm_mp3"); //生成了一个 sound 对象，加载音乐资源
        var channel = sound.play(0, 1); //调用 sound 的 play 方法，设置播放次数
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map