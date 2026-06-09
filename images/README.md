# Images folder

Put the book pictures here (PNG or JPG files) — for example `cinder-mount-claw.png`.

Then show one inside a book page (`book1.html` / `book2.html`) like this:

```html
<div class="flex justify-center my-8">
  <img src="images/cinder-mount-claw.png" alt="Cinder on Mount Claw"
       class="rounded-2xl shadow-lg max-w-full">
</div>
```

Tips for Idan:
- Keep the file name simple: lowercase, no spaces (use `-` between words).
- The picture won't show in the Gemini Canvas preview (Canvas can't see this
  folder) — it only appears once the page is on GitHub/Railway. To preview the
  layout in Canvas, you can temporarily use a full image web address, then swap
  it back to `images/your-file.png` before saving.
