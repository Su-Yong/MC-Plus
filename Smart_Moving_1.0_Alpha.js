
/*
* Copyright 2015. PlanP, KD
* All rights reserved.
* ------------------------------------------------------------------------------
* Smart_Moving_1.0_Alpha.js
*/

//Import

const bl = net.zhuoweizhang.mcpelauncher;

const Button = android.widget.Button;
const ToggleButton = android.widget.ToggleButton;
const TextView = android.widget.TextView;
const ImageView = android.widget.ImageView;
const Toast = android.widget.Toast;
const LinearLayout = android.widget.LinearLayout;
const FrameLayout = android.widget.FrameLayout;
const PopupWindow = android.widget.PopupWindow;
const ScrollView = android.widget.ScrollView;
const HorizontalScrollView = android.widget.HorizontalScrollView;

//widget
const GONE = android.view.View.GONE;
const VISIBLE = android.view.View.VISIBLE;
const OnTouchListener = android.view.View.OnTouchListener;
const OnClickListener = android.view.View.OnClickListener;
const MotionEvent = android.view.MotionEvent;
const Gravity = android.view.Gravity;

//View
const AlertDialog = android.app.AlertDialog;
const Intent = android.content.Intent;
const Uri = android.net.Uri;

//app / content / net
const Bitmap = android.graphics.Bitmap;
const Canvas = android.graphics.Canvas;
const Paint = android.graphics.Paint;
const Drawable = android.graphics.drawable.Drawaable;
const BitmapDrawable = android.graphics.drawable.BitmapDrawable;
const ColorDrawable = android.graphics.drawable.ColorDrawable;
const Typeface = android.graphics.Typeface;
const Color = android.graphics.Color;
const BitmapFactory = android.graphics.BitmapFactory;

//Graphics
const File = java.io.File;
const BufferedInputStream = java.io.BufferedInputStream;
const FileInputStream = java.io.FileInputStream;
const InputStream = java.io.InputStream;

//file
const BufferedImage = java.awt.image.BufferedImage;

//------------------------------------------------------------------------------

function newLevel ()
{
    MC.ctx.runOnUiThread (new java.lang.Runnable (
    {
        run : function ()
        {
            try
            {
		        SM.GUI.init();
            }
            catch (e)
            {
                MC.errorAlert(e);
            }
        }
    }));
}

function modTick ()
{
    MC.ctx.runOnUiThread (new java.lang.Runnable (
    {
        run : function ()
        {
            try
            {
                if (SM.Mode.Run)
                    SM.run();
            }
            catch (e)
            {
                MC.errorAlert(e);
            }
        }
    }));
}

function leaveGame ()
{
    MC.ctx.runOnUiThread (new java.lang.Runnable (
    {
        run : function ()
        {
            try
            {
                SM.GUI.destroy();
            }
            catch (e) {
                MC.errorAlert(e);
            }
        }
    }));
}

//------------------------------------------------------------------------------

var SM = {
    Window :
    {
        MultiButton : null,
        OptionBotton : null
    },

    Object :
    {
        EnergyBar : null,
        JumpBar : null,
		Option : null
    },

    Mode :
    {
        isJump : false,
        Run : true
    },
	
	Button :
	{
		Multi :
		{
			Nomal : 0,
			Up : 0,
			Down : 0
		}
	},

    init : function ()
    {
		SM.Object.EnergyBar = SM.GUI.EnergyBar();
        SM.Object.JumpBar = SM.GUI.JumpBar();
			
        SM.Object.Option = SM.GUI.Option();
		//오류남
		//SM.Object.Option.init();
    },

    run : function ()
    {
		SM.GUI.run();
		
        if (SM.Mode.isJump)
        {
            if (SM.Object.JumpBar.getValue() < 20)
                SM.Object.JumpBar.setValue(SM.Object.JumpBar.getValue()+1);
        }
        else if (SM.Object.JumpBar.getValue() > 0)
           SM.Object.JumpBar.setValue(0);
    },

    GUI :
    {
        init : function ()
        {
			if (SM.Mode.Run)
			{
				SM.Object.EnergyBar.show();
				SM.Object.JumpBar.show();

            	SM.Window.MultiButton = SM.GUI.MultiButton();
			}
			
            SM.Window.OptionBotton = SM.GUI.OptionBotton();
        },
		
		run : function ()
		{
			
		},
        
        destroy : function ()
        {
            if (SM.Window.OptionBotton != null)
            {
                SM.Window.OptionBotton.dismiss();
                SM.Window.OptionBotton = null;
            }
	        if (SM.Window.MultiButton != null)
            {
                SM.Window.MultiButton.dismiss();
                SM.Window.MultiButton = null;
            }
			
	        SM.Object.EnergyBar.destroy();
            SM.Object.JumpBar.destroy();
        },
        
        MultiButton : function ()
        {
            var window = new PopupWindow(MC.ctx);
            
            var layout = new LinearLayout(MC.ctx);
            
            var button = new MC.GUIButton(MC.Bitmap.GUIButton.JumpDrawable());
            
            var buttonUp = new MC.GUIButton(MC.Bitmap.GUIButton.FlyUpDrawable());
            var buttonDown = new MC.GUIButton(MC.Bitmap.GUIButton.FlyDownDrawable());
            
            var none1 = new TextView(MC.ctx);
            var none2 = new TextView(MC.ctx);
            
            var count = 0;
            
            button.setOnTouchListener (new OnTouchListener (
            {
                onTouch : function (view, event)
                {
                    if (event.getAction() == MotionEvent.ACTION_DOWN)
                    {
                        view.setImageBitmap(MC.Bitmap.LayerBitmap());
                        
						SM.Button.Nomal = 1;
						
                        count++;
						                 
				        if(count>=2)
						{
	                        buttonUp.setVisibility(VISIBLE);
	                        buttonDown.setVisibility(VISIBLE);
						    none1.setVisibility(VISIBLE);
							none2.setVisibility(VISIBLE);
			            }
						else
                        new java.lang.Thread (
						{
		                    run : function ()
				    		{
					            java.lang.Thread.sleep(250);
			                    Count = 0;
		                    }
						}).start();
                    }
                    if (event.getAction() == MotionEvent.ACTION_UP)
                    {
						SM.Button.Nomal = 0;
						
                        view.setImageBitmap(null);
						                 
		                buttonUp.setVisibility(GONE);
		                buttonDown.setVisibility(GONE);
		                none1.setVisibility(GONE);
		                none2.setVisibility(GONE);
                    }
                    return false;
                }
            }));
            
            buttonUp.setVisibility(GONE);
			buttonDown.setVisibility(GONE);
		    none1.setVisibility(GONE);
	        none2.setVisibility(GONE);
					     
            layout.setOrientation(1);
            layout.setGravity(Gravity.CENTER | Gravity.CENTER);
            layout.addView(button, MC.dp(40), MC.dp(40));
			layout.addView(buttonUp, MC.dp(35), MC.dp(35));
            layout.addView(none1, MC.dp(5), MC.dp(5));
            layout.addView(none2, MC.dp(5), MC.dp(5));
            layout.addView(buttonDown, MC.dp(35), MC.dp(35));
            
            window.setContentView(layout);
            window.setBackgroundDrawable(null);
            window.setWidth(MC.dp(40));
            window.setHeight(MC.dp(120));
            window.showAtLocation(MC.ctx.getWindow().getDecorView(),
                                  Gravity.RIGHT | Gravity.BOTTOM,
                                  MC.dp(20), MC.dp(20));

            return window;
        },
		
        EnergyBar : function ()
        {
            var bar = new MC.ImageBar(SM.GUI.Image.FullEnergy(), SM.GUI.Image.HalfEnergy(),
									  MC.dp(80), MC.dp(50), true);
            bar.setValue(0);

            return bar;
        },

        JumpBar : function () 
		{
            var bar = new MC.ImageBar(SM.GUI.Image.FullJump(), SM.GUI.Image.HalfJump(),
									  -MC.dp(80), MC.dp(50), false);
            bar.setValue(0);

            return bar;
        },

        OptionBotton : function ()
        {
            var window = new PopupWindow(MC.ctx);

            var button = new MC.ImageButton(MC.Bitmap.Option.Bitmap());

            button.setAlpha(0.5);

            button.setImageBitmap(MC.onSizePatch(MC.Bitmap.Option.Bitmap(), 16));

            button.setOnClickListener (new OnClickListener (
            {
                onClick: function (view)
                {
                    try
                    {
                        SM.Object.Option.show();
                    }
                    catch (e)
                    {
                        MC.errorAlert(e);
                    }
                }
            }));

            window.setContentView(button);
            window.setBackgroundDrawable(null);
            window.setWidth(MC.dp(34));
            window.setHeight(MC.dp(34));
            window.showAtLocation(MC.ctx.getWindow().getDecorView(),
                                  Gravity.RIGHT | Gravity.TOP,
                                  MC.dp(38), MC.dp(2));

			return window;
        },

        Option : function ()
        {
            var option = new MC.Option();

            option.setTitle("설정");

            option.addSlot(MC.Bitmap.Option.NormalBitmap());
			
            option.addText("게임");
            option.addSwitch("스마트무빙 사용", "enable_sm", "SM.Mode.Run", "SM.GUI.destroy(); SM.GUI.init();", "SM.GUI.destroy(); SM.GUI.init();");
            
            option.addText("리페");
            option.addText("진짜");
            option.addText("완전");
            option.addSwitch("멍청이", "enable_sm", "SM.Mode.Run", "", "");

            option.end();
            
            return option;
        },

        Image :
        {
            FullEnergy : function ()
            {
                //Color
                var Y = Color.parseColor("#FFFFFF00");

                //9×9 bitmap 
                var color = [0, 0, 0, 0, 0, Y, 0, 0, 0,
                             0, 0, 0, 0, Y, 0, 0, 0, 0,
                             0, 0, 0, Y, Y, 0, 0, 0, 0,
                             0, 0, Y, Y, 0, 0, 0, 0, 0,
                             0, 0, Y, Y, Y, Y, Y, 0, 0,
                             0, 0, 0, 0, 0, Y, Y, 0, 0,
                             0, 0, 0, 0, Y, Y, 0, 0, 0,
                             0, 0, 0, 0, Y, 0, 0, 0, 0,
                             0, 0, 0, Y, 0, 0, 0, 0, 0];

                var bit = Bitmap.createBitmap(9, 9, Bitmap.Config.ARGB_8888);
                bit.setPixels(color, 0, 9, 0, 0, 9, 9);

                var bitmap = Bitmap.createScaledBitmap(bit, MC.dp(32), MC.dp(32), false);
                return bitmap;
            },

            HalfEnergy : function ()
            {
                //Color
                var Y = Color.parseColor("#FFFFFF00");
                var W = Color.parseColor("#FFFFFFFF");

                //9×9 bitmap
                var color = [0, 0, 0, 0, 0, 0, 0, 0, 0,
                             0, W, 0, 0, 0, 0, 0, 0, 0,
                             0, 0, 0, 0, Y, 0, W, 0, 0,
                             0, 0, 0, Y, 0, 0, 0, 0, 0,
                             0, 0, 0, Y, Y, Y, 0, 0, 0,
                             0, 0, 0, 0, 0, Y, 0, 0, 0,
                             0, 0, W, 0, Y, 0, 0, 0, 0,
                             0, 0, 0, 0, 0, 0, 0, W, 0,
                             0, 0, 0, 0, 0, 0, 0, 0, 0];

                var bit = Bitmap.createBitmap(9, 9, Bitmap.Config.ARGB_8888);
                bit.setPixels(color, 0, 9, 0, 0, 9, 9);

                var bitmap = Bitmap.createScaledBitmap(bit, MC.dp(32), MC.dp(32), false);
                return bitmap;
            },

            FullJump : function ()
            {
                //Color
                var B = Color.parseColor("#FF1499FF");
                var b = Color.parseColor("#FF0526FF");
                var D = Color.parseColor("#FF000000");

                //9×9 bitmap
                var color = [0, 0, 0, 0, D, 0, 0, 0, 0,
                             0, 0, 0, D, B, D, 0, 0, 0,
                             0, 0, D, B, B, B, D, 0, 0,
                             0, D, B, B, B, B, B, D, 0,
                             D, b, b, B, B, B, b, b, D,
                             0, D, D, B, B, B, D, D, 0,
                             0, 0, D, B, B, B, D, 0, 0,
                             0, 0, D, b, b, b, D, 0, 0,
                             0, 0, 0, D, D, D, 0, 0, 0];

                var bit = Bitmap.createBitmap(9, 9, Bitmap.Config.ARGB_8888);
                bit.setPixels(color, 0, 9, 0, 0, 9, 9);

                var bitmap = Bitmap.createScaledBitmap(bit, MC.dp(32), MC.dp(32), false);
                return bitmap;
            },

            HalfJump : function ()
            {
                //Color
                var B = Color.parseColor("#FF1499FF");
                var b = Color.parseColor("#FF0526FF");
                var D = Color.parseColor("#FF000000");

                //9×9 bitmap
                var color = [0, 0, 0, 0, 0, 0, 0, 0, 0,
                             0, 0, 0, 0, D, 0, 0, 0, 0,
                             0, 0, 0, D, B, D, 0, 0, 0,
                             0, 0, D, B, B, B, D, 0, 0,
                             0, D, b, b, B, b, b, D, 0,
                             0, 0, 0, D, B, D, 0, 0, 0,
                             0, 0, 0, D, B, D, 0, 0, 0,
                             0, 0, 0, D, b, D, 0, 0, 0,
                             0, 0, 0, 0, D, 0, 0, 0, 0];

                var bit = Bitmap.createBitmap(9, 9, Bitmap.Config.ARGB_8888);
                bit.setPixels(color, 0, 9, 0, 0, 9, 9);

                var bitmap = Bitmap.createScaledBitmap(bit, MC.dp(32), MC.dp(32), false);
                return bitmap;
            }
        }
    }
};

//------------------------------------------------------------------------------

var MC =
{
    ctx : null,
	
    WIDTH : null,
    HEIGHT : null,

    font : null,

    init : function ()
    {
		MC.ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
		
		MC.WIDTH = MC.ctx.getScreenWidth();
        MC.HEIGHT = MC.ctx.getScreenHeight();
		
        MC.ctx.setTheme(android.R.style.Theme_Holo_Light);

        MC.ctx.runOnUiThread(new java.lang.Runnable(
        {
            run: function () {
                try {
                    var path =
                        android.os.Environment.getExternalStorageDirectory()
                            + "/games/com.mojang/minecraftpe/mc.ttf";

                    if (!new File(path).exists()) {
                        MC.downFile("https://docs.google.com/uc?authuser=0&id=0BynSEqQ9CpItd0o3WG9JYktINlk&export=download",
                                 "/games/com.mojang/minecraftpe/", "mc.ttf");
                    }
                    else {
                        font = Typeface.createFromFile(path);
                    }
                }
                catch (e) {
                    MC.errorAlert(e);
                }
            }
        }));
    },

    onSizePatch : function (bit, size)
    {
        var lastBit = Bitmap.createBitmap(bit.getWidth() + MC.dp(size), bit.getHeight() + MC.dp(size),
		                                  Bitmap.Config.ARGB_8888);
        var canvas = new Canvas(lastBit);
        canvas.drawBitmap(bit, MC.dp(size / 2), MC.dp(size / 2), null);

        return lastBit;
    },

    createNinePatch : function (bitmap, x, y, xx, yy)
    {
        var NO_COLOR = 0x00000001;

        var buffer = java.nio.ByteBuffer.allocate(84).order(java.nio.ByteOrder.nativeOrder());

        buffer.put(0x01);
        buffer.put(0x02);
        buffer.put(0x02);
        buffer.put(0x09);

        buffer.putInt(0);
        buffer.putInt(0);
        buffer.putInt(0);
        buffer.putInt(0);
        buffer.putInt(0);
        buffer.putInt(0);
        buffer.putInt(0);
        buffer.putInt(y);
        buffer.putInt(yy);
        buffer.putInt(x);
        buffer.putInt(xx);

        buffer.putInt(NO_COLOR);
        buffer.putInt(NO_COLOR);
        buffer.putInt(NO_COLOR);
        buffer.putInt(NO_COLOR);
        buffer.putInt(NO_COLOR);
        buffer.putInt(NO_COLOR);
        buffer.putInt(NO_COLOR);
        buffer.putInt(NO_COLOR);
        buffer.putInt(NO_COLOR);

        var drawable = new android.graphics.drawable.NinePatchDrawable(MC.ctx.getResources(),
                                                                       bitmap, buffer.array(),
                                                                       new android.graphics.Rect(), null);
        return drawable;
    },

    errorAlert : function (e)
    {
        MC.ctx.runOnUiThread (new java.lang.Runnable (
        {
            run : function ()
            {
                try
                {
                    var dialog = new AlertDialog.Builder(MC.ctx);
                    dialog.setTitle("Error!");
                    var str = "Error!\n - " + e.name + "\n - #" + (e.lineNumber + 1) + "\n\n" + e.message;
                    dialog.setMessage(str);
                    dialog.show();
                }
                catch (e)
                {
                    print(e);
                }
            }
        }));
    },

    downFile : function (url, path, fileName) //Thanks to appogattoman
    {
        MC.ctx.runOnUiThread (new java.lang.Runnable (
        {
            run : function ()
            {
                try
                {
                    var uri = new android.net.Uri.parse(url);
                    var request = new android.app.DownloadManager.Request(uri);
                    request.setTitle(fileName);
                    request.setDestinationInExternalPublicDir(path, fileName);
                    MC.ctx.getSystemService(android.content.Context.DOWNLOAD_SERVICE).enqueue(request);
                }
                catch (e)
                {
                    MC.errorAlert(e);
                }
            }
        }));
    },

    dp : function (dips)
    {
        return Math.ceil(dips * MC.ctx.getResources().getDisplayMetrics().density);
    },

    Bitmap :
    {
        sheet : BitmapFactory.decodeStream(
                                ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png")),
        touchGUI : BitmapFactory.decodeStream(
                                ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png")),
        touchGUI2 : BitmapFactory.decodeStream(
                                ModPE.openInputStreamFromTexturePack("images/gui/touchgui2.png")),
        GUI : BitmapFactory.decodeStream(
                                ModPE.openInputStreamFromTexturePack("images/gui/gui.png")),

        NormalDrawable : function ()
        {
            var bitmap = Bitmap.createBitmap(MC.Bitmap.sheet, 8, 32, 8, 8);
            var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(16), MC.dp(16), false);

            return MC.createNinePatch(bit, MC.dp(4), MC.dp(4), MC.dp(12), MC.dp(14));
        },

        PushDrawable : function ()
        {
            var bitmap = Bitmap.createBitmap(MC.Bitmap.sheet, 0, 32, 8, 8);
            var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(16), MC.dp(16), false);

            return MC.createNinePatch(bit, MC.dp(4), MC.dp(4), MC.dp(12), MC.dp(14));
        },

        HeadDrawable : function ()
        {
            var bitmap = Bitmap.createBitmap(MC.Bitmap.touchGUI, 150, 26, 14, 30);

            for (var i = 0; i < 26; i++)
            {
                bitmap.setPixel(2, i, bitmap.getPixel(3, i));
                bitmap.setPixel(11, i, bitmap.getPixel(10, i));
            }

            for (var i = 3; i < 11; i++)
            {
                bitmap.setPixel(i, 25, bitmap.getPixel(i, 26));
                bitmap.setPixel(i, 26, bitmap.getPixel(i, 27));
                bitmap.setPixel(i, 27, bitmap.getPixel(i, 28));
                bitmap.setPixel(i, 28, 0x00000000);
            }

            for (var i = 0; i < 14; i++)
            {
                bitmap.setPixel(i, 25, bitmap.getPixel(4, 25));
                bitmap.setPixel(i, 26, bitmap.getPixel(4, 26));
                bitmap.setPixel(i, 27, bitmap.getPixel(4, 27));
            }

            var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(28), MC.dp(60), false);

            return MC.createNinePatch(bit, MC.dp(5), MC.dp(7), MC.dp(46), MC.dp(22));
        },

        BackDrawable : function ()
        {
            var bitmap = Bitmap.createBitmap(MC.Bitmap.sheet, 0, 0, 16, 16);
            var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(32), MC.dp(32), false);

            return MC.createNinePatch(bit, MC.dp(10), MC.dp(10), MC.dp(24), MC.dp(24));
        },

        FrameDrawable : function ()
        {
            var bitmap = Bitmap.createBitmap(MC.Bitmap.sheet, 28, 42, 4, 4);

            bitmap.setPixel(1, 1, Color.parseColor("#ff333333"));
            bitmap.setPixel(1, 2, Color.parseColor("#ff333333"));
            bitmap.setPixel(2, 1, Color.parseColor("#ff333333"));
            bitmap.setPixel(2, 2, Color.parseColor("#ff333333"));

            var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(8), MC.dp(8), false);

            return MC.createNinePatch(bit, MC.dp(2), MC.dp(2), MC.dp(6), MC.dp(6));
        },

        XNormalDrawable : function ()
        {
            var bitmap = Bitmap.createBitmap(MC.Bitmap.sheet, 60, 0, 18, 18);
            var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(100), MC.dp(100), false);

            return new BitmapDrawable(bit);
        },

        XPushDrawable : function ()
        {
            var bitmap = Bitmap.createBitmap(MC.Bitmap.sheet, 78, 0, 18, 18);
            var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(100), MC.dp(100), false);

            return new BitmapDrawable(bit);
        },

        InvenBackDrawable : function ()
        {
            var bitmap = Bitmap.createBitmap(MC.Bitmap.GUI, 200, 46, 16, 16);
            var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(42), MC.dp(42), false);

            return MC.createNinePatch(bit, MC.dp(2), MC.dp(2), MC.dp(40), MC.dp(40));
        },

        CaseDrawable : function ()
        {
            var bitmap = Bitmap.createBitmap(MC.Bitmap.sheet, 10, 42, 16, 16);
            var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(32), MC.dp(32), false);

            return MC.createNinePatch(bit, MC.dp(8), MC.dp(8), MC.dp(20), MC.dp(20));
        },

        ArrawBitmap : function ()
        {
            var bitmap = Bitmap.createBitmap(MC.Bitmap.sheet, 73, 36, 22, 15);

            return Bitmap.createScaledBitmap(bitmap, MC.dp(44), MC.dp(30), false);
        },

        PanelDrawable : function ()
        {
            var bitmap = Bitmap.createBitmap(MC.Bitmap.sheet, 34, 43, 14, 14);
            var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(56), MC.dp(56), false);

            return MC.createNinePatch(bit, MC.dp(12), MC.dp(12), MC.dp(44), MC.dp(44));
        },

        SwitchOffDrawable : function ()
        {
            var bitmap = Bitmap.createBitmap(MC.Bitmap.touchGUI, 160, 206, 38, 19);
            var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(76), MC.dp(38), false);

            return new BitmapDrawable(bit);
        },

        SwitchOnDrawable : function ()
        {
            var bitmap = Bitmap.createBitmap(MC.Bitmap.touchGUI, 198, 206, 38, 19);
            var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(76), MC.dp(37), false);

            return new BitmapDrawable(bit);
        },

        SelectDrawable : function ()
        {
            var bitmap = Bitmap.createBitmap(MC.Bitmap.sheet, 38, 11, 8, 4);
            var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(32), MC.dp(16), false);

            return new BitmapDrawable(bit);
        },

        Option :
        {
            Bitmap : function ()
            {
                var bitmap = Bitmap.createBitmap(MC.Bitmap.touchGUI, 218, 0, 20, 20);
                var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(40), MC.dp(40), false);

                return bit;
            },

            NormalBitmap : function ()
            {
                var bitmap = Bitmap.createBitmap(MC.Bitmap.touchGUI2, 134, 0, 28, 28);
                var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(56), MC.dp(56), false);

                return bit;
            },

            SkinBitmap : function ()
            {
                var bitmap = Bitmap.createBitmap(MC.Bitmap.touchGUI2, 106, 56, 26, 26);
                var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(54), MC.dp(54), false);

                return bit;
            },

            GameBitmap : function ()
            {
                var bitmap = Bitmap.createBitmap(MC.Bitmap.touchGUI2, 106, 0, 28, 28);
                var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(56), MC.dp(56), false);

                return bit;
            },

            GraphicBitmap : function ()
            {
                var bitmap = Bitmap.createBitmap(MC.Bitmap.touchGUI2, 134, 27, 28, 28);
                var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(56), MC.dp(56), false);

                return bit;
            },
        },
    
        GUIButton :
        {
            JumpDrawable : function ()
            {
                var bitmap = Bitmap.createBitmap(MC.Bitmap.GUI, 108, 111, 18, 18);
                var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(36), MC.dp(36), false);

                return new BitmapDrawable(bit);
            },
            
            FlyUpDrawable : function ()
            {
                var bitmap = Bitmap.createBitmap(MC.Bitmap.GUI, 56, 139, 18, 18);
                var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(36), MC.dp(36), false);

                return new BitmapDrawable(bit);
            },
            
            FlyDownDrawable : function ()
            {
                var bitmap = Bitmap.createBitmap(MC.Bitmap.GUI, 82, 135, 18, 18);
                var bit = Bitmap.createScaledBitmap(bitmap, MC.dp(36), MC.dp(36), false);

                return new BitmapDrawable(bit);
            },
        },
        
        LayerBitmap : function ()
        {
            var bit = Bitmap.createBitmap(1, 1, Bitmap.Config.ARGB_8888);
            bit.setPixels([Color.parseColor("#30000000")], 0, 1, 0, 0, 1, 1);

            var bitmap = Bitmap.createScaledBitmap(bit, MC.dp(8), MC.dp(8), false);
            return bitmap;
        }
    },
	
    Button : function ()
    {
        var bt = new Button(MC.ctx);

        bt.setTextColor(Color.parseColor("#ffe1e1e1"));
        bt.setTextSize(16);
        bt.setTypeface(MC.font);
        bt.setShadowLayer(1, MC.dp(2), MC.dp(2), Color.argb(255, 44, 44, 44));

        bt.setOnTouchListener (new OnTouchListener (
        {
            onTouch: function (view, event)
            {
                if (event.getAction() == MotionEvent.ACTION_DOWN)
                {
                    bt.setBackgroundDrawable(MC.Bitmap.PushDrawable());
                    bt.setTextColor(Color.parseColor("#ffffa1"));
                }
                if (event.getAction() == MotionEvent.ACTION_UP)
                {
                    bt.setBackgroundDrawable(MC.Bitmap.NormalDrawable());
                    bt.setTextColor(Color.parseColor("#e1e1e1"));
                }

                return false;
            }
        }));
        bt.setBackgroundDrawable(MC.Bitmap.NormalDrawable());

        return bt;
    },

    ImageButton : function (bit)
    {
        var bt = new ImageView(MC.ctx);

        bt.setClickable(true);
        bt.setOnTouchListener (new OnTouchListener (
        {
            onTouch: function (view, event)
            {
                if (event.getAction() == MotionEvent.ACTION_DOWN)
                {
                    bt.setImageBitmap(MC.onSizePatch(bit, 20));
                    bt.setBackgroundDrawable(MC.Bitmap.PushDrawable());
                }
                if (event.getAction() == MotionEvent.ACTION_UP)
                {
                    bt.setImageBitmap(MC.onSizePatch(bit, 16));
                    bt.setBackgroundDrawable(MC.Bitmap.NormalDrawable());
                }
                return false;
            }
        }));
        bt.setBackgroundDrawable(MC.Bitmap.NormalDrawable());

        return bt;
    },
    
    GUIButton : function (bit)
    {
        var bt = new ImageView(MC.ctx);
        
        bt.setAlpha(0.5);
        bt.setClickable(true);
        bt.setOnTouchListener (new OnTouchListener (
        {
            onTouch: function (view, event)
            {
                if (event.getAction() == MotionEvent.ACTION_DOWN)
                    bt.setImageBitmap(MC.Bitmap.LayerBitmap());
                if (event.getAction() == MotionEvent.ACTION_UP)
                    bt.setImageBitmap(null);
                return false;
            }
        }));
        bt.setBackgroundDrawable(bit);

        return bt;
    },
    
    Switch : function (isOn)
    {
        var bt = new ToggleButton(MC.ctx);

        bt.setText("");
        bt.setTextOn("");
        bt.setTextOff("");

        bt.setOnClickListener (new OnClickListener (
        {
            onClick : function (view)
            {
                if (bt.isChecked())
                    bt.setBackgroundDrawable(MC.Bitmap.SwitchOnDrawable());
                if (!bt.isChecked())
                    bt.setBackgroundDrawable(MC.Bitmap.SwitchOffDrawable());
            }
        }));
        bt.setBackgroundDrawable(MC.Bitmap.SwitchOffDrawable());

        if (isOn)
        {
            bt.setBackgroundDrawable(MC.Bitmap.SwitchOnDrawable());
            bt.setChecked(true);
        }

        return bt;
    },

    ImageToggle : function ()
    {
        var bt = new ImageView(MC.ctx);

        bt.setClickable(true);
        bt.setBackgroundDrawable(MC.Bitmap.NormalDrawable());

        return bt;
    },

    XButton : function ()
    {
        var bt = new Button(MC.ctx);

        bt.setOnTouchListener (new OnTouchListener (
        {
            onTouch: function (view, event)
            {
                if (event.getAction() == MotionEvent.ACTION_DOWN)
                    bt.setBackgroundDrawable(MC.Bitmap.XPushDrawable());
                if (event.getAction() == MotionEvent.ACTION_UP)
                    bt.setBackgroundDrawable(MC.Bitmap.XNormalDrawable());

                return false;
            }
        }));
        bt.setBackgroundDrawable(MC.Bitmap.XNormalDrawable());

        return bt;
    },

    TextView : function ()
    {
        var tv = new TextView(MC.ctx);

        tv.setTextColor(Color.parseColor("#ffe1e1e1"));
        tv.setTextSize(16);
        tv.setTypeface(MC.font);
        tv.setShadowLayer(1, MC.dp(2), MC.dp(2), Color.argb(255, 44, 44, 44));

        return tv;
    },

    Option : function ()
    {
        var index = -1;
        var index2 = -1;
        
        var keyCodeList = new Array();
        var variationList = new Array();
        
        var option = new PopupWindow(MC.ctx);

        var layout_main = new FrameLayout(MC.ctx);
        var layout_title = new FrameLayout(MC.ctx);
        var title = new MC.TextView(MC.ctx);

        var layout_close = new LinearLayout(MC.ctx);
        var close = new MC.Button(MC.ctx);

        var layout_left = new LinearLayout(MC.ctx);
        var layout_list = new Array();
        var layout_scr = new Array();
        var tv_head = new Array();

        var slot = new Array();
	
        title.setText("설정");
        title.setGravity(Gravity.CENTER | Gravity.CENTER);

        close.setText("돌아가기");
        close.setOnClickListener (new OnClickListener (
        {
            onClick : function (view)
            {
                option.dismiss();
                option = null;
            }
        }));

        layout_close.setPadding(MC.dp(5), MC.dp(8), MC.dp(5), MC.dp(5));
        layout_close.addView(close);

        layout_title.setBackgroundDrawable(MC.Bitmap.HeadDrawable());
        layout_title.addView(layout_close, MC.dp(96), MC.dp(48));
        layout_title.addView(title, MC.WIDTH, MC.dp(55));

        layout_left.setPadding(0, MC.dp(70), 0, MC.dp(20));
        layout_left.setOrientation(1);
        layout_left.setGravity(Gravity.CENTER | Gravity.CENTER);
        layout_left.setBackgroundDrawable(new ColorDrawable(Color.parseColor("#FF948781")));
        
        this.setTitle = function (str) {
            title.setText(str);
        };

        this.addSlot = function (bit)
        {
            index++;
            
            var thisIndex = index;
            
            slot[index] = new MC.ImageToggle(MC.ctx);

            slot[index].setOnClickListener (new OnClickListener (
            {
                onClick : function (view)
                {
                    for (var i in slot)
                    {
                        slot[i].setBackgroundDrawable(MC.Bitmap.NormalDrawable());
                        layout_list[i].setVisibility(GONE);
                        layout_scr[i].setVisibility(GONE);
                    }
                    view.setBackgroundDrawable(MC.Bitmap.PushDrawable());
                    layout_list[thisIndex].setVisibility(VISIBLE);
                    layout_scr[thisIndex].setVisibility(VISIBLE);
                }
            }));

            slot[index].setImageBitmap(bit);

            layout_list[index] = new LinearLayout(MC.ctx);
            layout_list[index].setOrientation(1);
            layout_list[index].setPadding(MC.dp(100), MC.dp(65), MC.dp(0), MC.dp(0));
            layout_list[index].setVisibility(GONE);

            layout_scr[index] = new ScrollView(MC.ctx);
            layout_scr[index].setVisibility(GONE);

            if (index == 0)
            {
                slot[index].setBackgroundDrawable(MC.Bitmap.PushDrawable());
                layout_list[index].setVisibility(VISIBLE);
                layout_scr[index].setVisibility(VISIBLE);
            }
            layout_left.addView(slot[index], MC.dp(55), MC.dp(55));

            layout_scr[index].addView(layout_list[index]);
            layout_main.addView(layout_scr[index], MC.WIDTH, MC.HEIGHT);
        };

        this.addText = function (str)
        {
            index2++;
            
            tv_head[index2] = new MC.TextView(MC.ctx);
            tv_head[index2].setText(str);
            
            layout_list[index].addView(tv_head[index2]);
        };

        this.addSwitch = function (name, keyCode, variation, offClickFunc, onClickFunc)
        {
            variationList.push(variation);
            keyCodeList.push(keyCode);
            
            var layout = new LinearLayout(MC.ctx);
    
            var tv = new MC.TextView();
            tv.setText("   " + name);
            tv.setTextColor(Color.parseColor("#FFB5B5B5"));

            var isCheck = ModPE.readData(keyCode);
			var bool;
			
            if (isCheck == "true")
                bool = true;
            else
                bool = false;
					
			eval(variation + "=" + bool + ";");
			
			ModPE.saveData(keyCode, isCheck);
			
			var switch_ = new MC.Switch(bool);
            switch_.setOnClickListener (new OnClickListener (
            {
                onClick : function (view)
                {
                    if (view.isChecked())
					{
						view.setBackgroundDrawable(MC.Bitmap.SwitchOnDrawable());
						eval(onClickFunc+"");
						eval(variation + " = true;");
					}
                    if (!view.isChecked())
					{
						view.setBackgroundDrawable(MC.Bitmap.SwitchOffDrawable());
						eval(offClickFunc+"");
						eval(variation + " = false;");
					}

                    ModPE.saveData(keyCode, view.isChecked());
		
                }
            }));

            layout.addView(tv, MC.WIDTH - MC.dp(105) - MC.dp(95), MC.dp(40));
            layout.addView(switch_, MC.dp(80), MC.dp(40));

            layout_list[index].addView(layout, MC.WIDTH - MC.dp(105) - MC.dp(15), MC.dp(45));
        };

        this.end = function ()
        {
            if (index < 6)
                layout_main.addView(layout_left, MC.dp(75), MC.HEIGHT);
            else
            {
                var layout_left_scr = new ScrollView(MC.ctx);
                
                layout_left_scr.addView(layout_left, MC.dp(75), MC.HEIGHT);
                layout_left_scr.setBackgroundDrawable(new ColorDrawable(Color.parseColor("#FF948781")));

                layout_main.addView(layout_left_scr, MC.dp(75), MC.HEIGHT);
            }
            layout_main.addView(layout_title, MC.WIDTH, MC.dp(60));
        };

        this.getWindow = function () {
            return option;
        };
        
        this.show = function ()
        {
            option.setContentView(layout_main);
            option.setBackgroundDrawable(new ColorDrawable(Color.parseColor("#80000000")));
            option.setWidth(MC.WIDTH);
            option.setHeight(MC.HEIGHT);
            option.showAtLocation(MC.ctx.getWindow().getDecorView(),
                                  Gravity.RIGHT | Gravity.BOTTOM,
                                  MC.dp(0), MC.dp(0));
        };
        
        this.destroy = function ()
        {
			option.dismiss();
            //option = null;
        };
        
        this.init = function ()
        {
            for (var i in keyCodeList)
                eval(variationList[i] + " = " + ModPE.readData(keyCodeList[i]) + ";");
        };       
	},
	
	ImageBar : function (fullImage, halfImage,
	                     widthMargin, heightMargin, isReverse)
    {
        var window = new PopupWindow(MC.ctx);      
        var layout_main = new LinearLayout(MC.ctx);
        
        var image = new Array();
        var _value = 0;
		
        for (var i = 0; i < 10; i++)
        {
            if (!isReverse)
            {
                image[i] = new ImageView(MC.ctx);
                layout_main.addView(image[i],MC.dp(15),MC.dp(15));
            }
            else if (isReverse)
            {
                image[9-i] = new ImageView(MC.ctx);
                layout_main.addView(image[9-i],MC.dp(15),MC.dp(15));
            }
        }
        
        this.setValue = function (value)
        {
            var last = 0;
            _value = value;
			
            for (var i = 0; i < 10; i++)
            {
                if (i < _value/2)
                {
                    image[i].setImageBitmap(fullImage);
                    last++;
                }
                else
                    image[i].setImageBitmap(null);
            }
            
            if (_value%2 == 1 && _value != 0)
                image[last-1].setImageBitmap(halfImage);
        };
		
		this.getValue = function ()
        {
            return _value;
        };
        
        this.getWindow = function ()
		{
			return window;
		};
		
		this.show = function ()
        {
            window.setContentView(layout_main);
            window.setBackgroundDrawable(null);
            window.setWidth(MC.dp(150));
            window.setHeight(MC.dp(15));
            window.showAtLocation(MC.ctx.getWindow().getDecorView(),
		                          Gravity.CENTER | Gravity.BOTTOM,
		     					  widthMargin, heightMargin);
        };
        
        this.destroy = function ()
        {
            window.dismiss();
            //window = null;
        };
    }
};

MC.init();
SM.init();
