<!-- directoryToTree("dummy_dir/a_dir", 5); -->
```
{
  "name": "a_dir",
  "path": "dummy_dir\\a_dir",
  "type": "dir",
  "size": 0,
  "children": [
    {
      "name": "test_file1.md",
      "path": "dummy_dir\\a_dir\\test_file1.md",
      "type": "file",
      "size": 0
    }
  ]
}
```
<!-- directoryToTree("dummy_dir", 5); -->
```
{
  "name": "dummy_dir",
  "path": "dummy_dir",
  "type": "dir",
  "size": 0,
  "children": [
    {
      "name": "a_dir",
      "path": "dummy_dir\\a_dir",
      "type": "dir",
      "size": 0,
      "children": [
        {
          "name": "test_file1.md",
          "path": "dummy_dir\\a_dir\\test_file1.md",
          "type": "file",
          "size": 0
        }
      ]
    },
    {
      "name": "b_dir",
      "path": "dummy_dir\\b_dir",
      "type": "dir",
      "size": 0,
      "children": [
        {
          "name": "test_file2.md",
          "path": "dummy_dir\\b_dir\\test_file2.md",
          "type": "file",
          "size": 4
        }
      ]
    },
    {
      "name": "test_file0.md",
      "path": "dummy_dir\\test_file0.md",
      "type": "file",
      "size": 13
    }
  ]
}
```
<!-- directoryToTree("dummy_dir", 1); -->
```
{
  "name": "dummy_dir",
  "path": "dummy_dir",
  "type": "dir",
  "size": 0,
  "children": [
    {
      "name": "a_dir",
      "path": "dummy_dir\\a_dir",
      "type": "dir",
      "size": 0
    },
    {
      "name": "b_dir",
      "path": "dummy_dir\\b_dir",
      "type": "dir",
      "size": 0
    },
    {
      "name": "test_file0.md",
      "path": "dummy_dir\\test_file0.md",
      "type": "file",
      "size": 13
    }
  ]
}
```

