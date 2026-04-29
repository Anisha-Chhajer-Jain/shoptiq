# Feature-Driven Architecture

This directory follows the **Feature-Driven (or Feature-Sliced) Design** approach. Instead of grouping files by their technical role (e.g., placing all components in `src/components`, all hooks in `src/hooks`, all API calls in `src/services`), we group them by the **business feature** they belong to.

## Why Feature-Driven?
As an application grows, finding related code becomes difficult. By grouping by feature, you create self-contained modules that are highly cohesive and loosely coupled from the rest of the app. This drastically improves code quality, readability, and scalability.

## Folder Structure within `features/`
Each feature (e.g., `auth`, `products`, `checkout`) should ideally have its own folder containing:

```text
features/
  └── [featureName]/
      ├── components/     # UI components specific to this feature
      ├── hooks/          # Custom React hooks specific to this feature
      ├── api/            # API calls and queries related to this feature (e.g., Axios requests)
      ├── store/          # Redux slices, context, or state specific to this feature
      ├── utils/          # Helper functions just for this feature
      └── index.js        # Public API for this feature (Export ONLY what is needed externally)
```

### Best Practices:
1. **Strict Encapsulation**: A feature should only expose what other parts of the app *need* to consume through its `index.js`. Do not deep-import from inside a feature.
2. **Global vs Local**: If a component (like a Button) or a hook (like `useLocalStorage`) is used across *multiple* features, it belongs in the global `src/components` or `src/hooks` folder. If it is *only* used for authentication, it goes in `src/features/auth/components`.
3. **Clean Code Structure**: Maintain consistent naming conventions within your features (e.g., PascalCase for components, camelCase for hooks and utils).
