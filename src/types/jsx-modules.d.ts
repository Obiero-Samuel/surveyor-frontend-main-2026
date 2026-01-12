declare module '*.jsx' {
    import type { FunctionComponent } from 'react';
    const component: FunctionComponent<any>;
    export default component;
}
