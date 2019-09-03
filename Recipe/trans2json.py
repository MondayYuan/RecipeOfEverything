import os
import json
import shutil

def extract(food_dir, img_dir):
    food = {}
    
    with open(os.path.join(food_dir, 'id.txt')) as f:
        food_id = [x.strip() for x in f.readlines()][0]

    food['id'] = food_id
    food['_id'] = food_id

    print(food_dir, food_id)

    food['title'] = food_dir
    
    with open(os.path.join(food_dir, 'material.txt')) as f:
        materials = [x.strip() for x in f.readlines()]
    food['ingredients'] = materials[0]
    food['auxiliary'] = materials[1]
    food['seasoning'] = materials[2]

    with open(os.path.join(food_dir, 'steps.txt')) as f:
        steps = [x.strip() for x in f.readlines()]
    food['steps'] = steps

    with open(os.path.join(food_dir, 'tips.txt')) as f:
        tips = [x.strip() for x in f.readlines()]
    food['tips'] = tips

    with open(os.path.join(food_dir, 'description.txt')) as f:
        description = [x.strip() for x in f.readlines()]
    if len(description) > 0:
        food['description'] = description[0]
    else:
        food['description'] = ''
    
    with open(os.path.join(food_dir, 'tags.txt')) as f:
        tags = [x.strip() for x in f.readlines()]
    food['tags'] = tags
    food['tags'].append(food['title'])

    food['banner'] = f'/{img_dir}/banner_{food_id}.jpg'

    return food

def main():
    receipts = []

    img_dir = 'recipes'

    if os.path.exists(img_dir):
        for file in os.listdir(img_dir):
            os.remove(os.path.join(img_dir, file))
        os.rmdir(img_dir)
    os.mkdir(img_dir)

    for food_dir in os.listdir('./'):
        if(os.path.isfile(food_dir) or food_dir == img_dir):
            continue
        food = extract(food_dir, img_dir)
        receipts.append(food)
        src_img = os.path.join(food_dir, 'banner.jpg')
        food_id = food['id']
        target_img = os.path.join(img_dir, f'banner_{food_id}.jpg')
        shutil.copy(src_img, target_img)

    f = open('./recipes.json', 'w', encoding='utf-8')
    for food in receipts:
        # print(food)
        f.write(json.dumps(food, ensure_ascii=False))
        f.write('\n')
    f.close()

    print('食谱生成成功')

if __name__ == '__main__':
    main()