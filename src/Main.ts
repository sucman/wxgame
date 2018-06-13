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

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        //this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {

        var bg:egret.Shape = new egret.Shape();//建立一个egret.Shape对象bg,egret.Shape对象有图形绘制功能

        bg.graphics.beginFill(0x336699);//定义图形的填充颜色
        bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);//绘制矩形
        bg.graphics.endFill();//结束绘制工作
        this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;//调整屏幕适配模式
        super.addChild(bg);//添加到显示结构中，才可以在运行时显示出来
        //addChild，这是Egret引擎操作显示列表的一个最常用的方法，就是将某个显示对象添加到某个显示容器上

        var tx:egret.TextField = new egret.TextField();//egret.TextField显示文字
        tx.text = "随便玩玩";
        tx.size = 32;
        super.addChild(tx);
        tx.x = 20;//设置锚点
        tx.y = 20;
        tx.width = this.stage.stageWidth - 40;

        tx.touchEnabled = true;//允许该显示对象响应Touch事件
        tx.addEventListener(egret.TouchEvent.TOUCH_TAP,function( evt:egret.TouchEvent ):void{    
        tx.textColor = 0x00ff00; },this);//事件处理函数

        //console.log( "createGameScene", RES.getRes("123_png") );

        var zhixi:egret.Bitmap = new egret.Bitmap( RES.getRes("123_png") );//在构造函数中传入RES载入的资源
        zhixi.x = 0;//设置锚点
        zhixi.y = 0;
        this.addChild( zhixi );

        var taiji1:egret.Bitmap = new egret.Bitmap ( RES.getRes("1起势_jpg") );
        taiji1.x = 50;
        taiji1.y = 50;
        this.addChild (taiji1);
        taiji1.width = 360;
        taiji1.height = 640;

        var taiji2:egret.Bitmap = new egret.Bitmap ( RES.getRes("2左右野马分鬃_jpg") );
        taiji2.x = 100;
        taiji2.y = 100;
        this.addChild (taiji2);
        taiji2.width = 360;
        taiji2.height = 640;

        var taiji3:egret.Bitmap = new egret.Bitmap ( RES.getRes("3白鹤亮翅_jpg") );
        taiji3.x = 150;
        taiji3.y = 150;
        this.addChild (taiji3);
        taiji3.width = 360;
        taiji3.height = 640;

        this.setChildIndex( zhixi, this.getChildIndex( taiji1 ) );//设置深度
        this.swapChildren( taiji2, taiji3 );//交换深度

        this.setChildIndex( zhixi, 20 );

        console.log( "display indexes:", 
        this.getChildIndex( zhixi ),  
        this.getChildIndex( taiji1 ), 
        this.getChildIndex( taiji2 ), 
        this.getChildIndex( taiji3 ) );//显示当前深度

        //根据锚点的偏移修改坐标值
        zhixi.anchorOffsetX = 30;
        zhixi.anchorOffsetY = 40;
        zhixi.x += 30;
        zhixi.y += 40;


        //点击次数控制代码
        this.times = -1;
        var self = this;
        this.stage.addEventListener( egret.TouchEvent.TOUCH_TAP,function(){
            switch(++ self.times%3){//设计为在每次点击时增加1，并取余3，使得我们在点击一轮三次动画后，后续的点击还可以从头再运行
                case 0:
                //第一步：让两个图片互换，直接设置目标X坐标为对方的当前X坐标即可：
                egret.Tween.get( taiji1 ).to( { x:taiji3.x }, 300, egret.Ease.circIn );
                egret.Tween.get( taiji3 ).to( { x:taiji1.x }, 300, egret.Ease.circIn );
                break;

                case 1:
                //第二步：实现图片的透明度变为0.3，之后再恢复为1。
                egret.Tween.get( taiji2 ).to( { alpha:.3 }, 300, egret.Ease.circIn ).to( { alpha:1 }, 300, egret.Ease.circIn );
                break;

                case 2:
                //第三步：
                egret.Tween.get( zhixi ).to( { scaleX:.4, scaleY:.4 }, 500, egret.Ease.circIn ).to( { scaleX:1, scaleY:1 }, 500, egret.Ease.circIn );
                break;
            }
        },this);

        var sound:egret.Sound = RES.getRes("bgm_mp3");//生成了一个 sound 对象，加载音乐资源
        var channel:egret.SoundChannel = sound.play(0,1);//调用 sound 的 play 方法，设置播放次数

    }

    private times:number;//创建成员变量times记录点击次数

}