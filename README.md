# Recipe Of Everything

微信小程序：万物记食材

![小程序码](imgs/minicode.jpg)

## 参考

- https://blog.csdn.net/ln152315/article/details/89608239
- https://github.com/darylliu/micro_app_food

## 项目结构

```
│  Readme.md
├─Recipe // 用于生成菜谱数据         
└─RecipeOfEverything 
    │  app.js 
    │  app.json
    │  app.wxss
    │  project.config.json
    │  sitemap.json
    ├─custom-tab-bar    //自定义tabbar
    ├─images //项目图片
    └─pages
        ├─detail //详情页
        ├─index  //首页
        ├─list   //列表页
        ├─method //笋干泡发方法页
        ├─search //搜索页
        ├─shop   //店铺页
        └─user   //用户页
```

## 业务逻辑

1. **首页**：展示各个类别菜谱的展示，可以跳转到不同的列表页，跳转原理和搜索页相同。同时提供跳转到搜索页的按钮。
2. **搜索页**：精确搜索，实现原理是根据数据库中的类别列表进行匹配，在搜索的同时会把搜索历史记录下来。点击搜索结果，跳转菜谱列表页。
3. **列表页**：可以跳转到详情页。
4. **店铺页**：提供淘宝、拼多多、微信的二维码。
5. **用户页**：展示个人用户头像及收藏菜谱列表。
6. **详情页**：结构化页面，依次展示菜品的banner，名字，描述，原料，制作步骤，技巧等部分。可以跳转到店铺页、首页。提供收藏和分享功能。
7. **笋干泡发方法页**：展示笋干的泡发方法。



## 数据库

利用了微信小程序提供的免费数据库，使用了菜谱、用户搜索历史、用户收藏菜谱3个数据库。同时由于微信小程序大小限制为2M，无法将所有图片放在本地，所以还利用了微信小程序提供的云储存来存储菜品图片。

### 菜谱

```
│  
├─Recipe
│  │  trans2json.py //生成json数据和图片
|  |  recipes.json  //生成的json数据，可以直接导入云数据库
|  |  recipes       //生成的对应图片，需要导入云储存
│  └─干煸小鱼干      // 具体的菜谱
│         banner.jpg   //图片
│         description.txt //菜品描述
│         id.txt       //菜品id，不可与其他菜品重复
│         material.txt //用料，包括三行，依次为主食材、辅食材、调料
│         steps.txt    //步骤，每个步骤占一行
│         tags.txt     //标签，定义搜索词（精确匹配）
│         tips.txt     //小技巧，每个技巧占一行
```

## demo

![demo](imgs/demo.gif)