Pill-shaped call-to-action button; use `primary` (black fill) for the one CTA per section, `secondary`/`ghost` for lower-emphasis actions.

```jsx
<Button variant="primary" size="l" onClick={submit}>קבלת הצעת מחיר</Button>
<Button variant="secondary">איך זה עובד</Button>
```

Variants: `primary` (black fill, off-white text — the CTA anchor), `secondary` (outlined), `ghost` (borderless, text link weight). Sizes: `m` (default UI), `l` (hero CTA). `disabled` dims to 45% opacity and blocks the click.
