from django.http import HttpResponse
from backend import models
import json
import re  # 正则


def android_test(request):
    method = request.method
    print(method)
    if method == 'GET':
        print(request.GET.get('testData'))
    else:
        print(request.POST.get('testData'))
    return HttpResponse(json.dumps('test'))
