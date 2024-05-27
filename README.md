# LGTM Podcast



## Versioning

We use sem-ver in the following way:
- `major`: Seasons
- `minor`: Episodes
- `patch`: Revisions - used to fix any incorrect information, bugs, etc that have been found after the episode airs.

For example, `2.7.3` means season 2, episode 7, with 3 post episode edits. 

You can find each tagged version [GitHub repository](https://github.com/lgtmpodcast/podcast) so you can follow along, and use any code we've written.

### Creating A New Version

1. Update the package.json to the new version number, e.g. `2.7.3`.
2. Commit the result:
```bash
git add .
git commit -m "S02E07 - Revision 3"
```
3. Create the tag:
```bash
git tag v2.7.3
```
4. Push the tag
```bash
git push origin v2.7.3
```
