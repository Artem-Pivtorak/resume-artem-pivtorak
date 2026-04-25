with open("script.js", "r", encoding="utf-8") as f:
    text = f.read()
    if "localhost" in text: print("Found localhost in script.js")
    if "netlify" in text: print("Found netlify in script.js")
    if "http://127.0.0.1" in text: print("Found 127.0.0.1 in script.js")

with open("index.html", "r", encoding="utf-8") as f:
    text = f.read()
    if "localhost" in text: print("Found localhost in index.html")
    if "netlify" in text: print("Found netlify in index.html")
    if "http://127.0.0.1" in text: print("Found 127.0.0.1 in index.html")
