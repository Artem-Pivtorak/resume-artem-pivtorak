import urllib.request
urls = [
    "https://servers-resume-artem.netlify.app/projects.json",
    "https://servers-resume-artem.netlify.app/comments.json",
    "https://servers-resume-artem.netlify.app/public/images/profile.jpg",
    "https://servers-resume-artem.netlify.app/images/profile.jpg",
    "https://servers-resume-artem.netlify.app/projects"
]
for url in urls:
    try:
        response = urllib.request.urlopen(url)
        print(f"{url} - {response.getcode()}")
    except Exception as e:
        print(f"{url} - {e}")
