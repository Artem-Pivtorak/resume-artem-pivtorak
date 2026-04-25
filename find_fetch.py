with open("script.js", "r", encoding="utf-8") as f:
    text = f.read()
    for i, line in enumerate(text.splitlines()):
        if "fetch" in line:
            print(f"{i}: {line.strip()}")
