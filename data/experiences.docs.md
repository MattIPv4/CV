# Experiences File
This file is a JSON array of categories following the category model defined below.

# Category Model
```
{
    "name": "", // str - The name of the experience category
    "experience": [] // array[full experience] - "Full" experiences within this category (see below)
}
```

# Base Experience Model
```
{
    "position": {
        "role": "", // str - The name of the role held
        "from": "", // str - "Month Year" format for when started
        "to": "" // str|null - "Month Year" format for when ended, null for present
    },
    "points": [] // array[str] - Key points about the role (markdown)
}
```

# Full Experience Model
```
// Inherits all parts of base experience model plus...
{
    "company": {
        "name": "", // str - Name of the company this position was with
        "url": "", // str|null - Link for the company
        "headline": "" // str|null - Headline text to display alongside the link
    },
    "additional": [] // array[additional experience] - Additional experiences within the same company (see below)
}
```
