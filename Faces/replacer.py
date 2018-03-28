import yaml


# 传入
# 消息字符串（含有原生微信表情的标记）
# 标记和资源的映射表
# 传出
# HTML 编码的消息
def message_to_html(message: str, lookup: dict):
    html = message
    for entry in lookup:
        html = html.replace(entry, lookup[entry])
    return html


# Function to test.
if __name__ == '__main__':
    mappings = None
    with open('mappings.yaml') as f:
        mappings = yaml.load(f)

    test_strings = []
    with open('test.txt', encoding='utf8') as f:
        for line in f.readlines():
            test_strings.append(line)
    print(test_strings)

    for line in test_strings:
        print(message_to_html(line, mappings))
