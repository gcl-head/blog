from django.http import HttpResponse
from backend import models
import json
import re  # 正则


def get_blog(request):
    if request.method == 'GET':
        # 获取导航栏博客类别列表
        group = list(models.BlogGroup.objects.all().values('id', 'kind', 'href'))
        return HttpResponse(json.dumps(group))
    elif request.method == 'POST':
        # 获取博客目录
        # 性能待优化！
        href = json.loads(request.body.decode('utf-8'))['blogHref']
        item = list(models.BlogItem.objects.all().values('href', 'title', 'name'))
        chosenItem = []  # 数据库中当前导航类别的blog
        chosenTitle = []  # 数据中当前导航类别的大标题
        for i in item:
            if i['href'] == href:
                chosenItem.append(i)
                chosenTitle.append(i['title'])
        titles = list(set(chosenTitle))  # 去重后的chosenTitle
        re = []
        for title in titles:
            name = []
            for c in chosenItem:
                if c['title'] == title:
                    name.append(c['name'])
            re.append({
                'title': title,
                'name': name
            })
        return HttpResponse(json.dumps(re))


def get_blog_content(request):
    if request.method == 'POST':
        # 获取博客文字内容
        href = json.loads(request.body.decode('utf-8'))['blogHref']
        name = json.loads(request.body.decode('utf-8'))['blogName']
        item = models.BlogContent.objects.get(href=href, name=name)
        re = {
            'text': item.text,  # 博客内容
            'create_timestamp': item.create_timestamp.strftime('%Y-%m-%d'),  # 博客首次创建时间
            'last_edit_timestamp': item.last_edit_timestamp.strftime('%Y-%m-%d')  # 博客最后修改时间
        }
        return HttpResponse(json.dumps(re))


def search(request):
    # 搜索博客文字内容并返回前5条
    content = request.body.decode('utf-8')  # 搜索框内容
    print(content)
    result = models.BlogContent.objects.filter(text__icontains=content)[:5]  # 搜索结果前五条
    res = []
    for r in result:
        position = re.search(content, r.text, re.I).span()[0]  # 匹配位置
        res.append(
            {
                'name': r.name,
                'href': r.href,
                'value': r.text[position:position+20]
            }
        )
    return HttpResponse(json.dumps(res))
