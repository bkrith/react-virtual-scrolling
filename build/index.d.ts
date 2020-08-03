import React = require("react");
interface AppState {
    items: any[];
    first: number;
    last: number;
}
declare class VirtualScrolling extends React.Component<{
    items: any[];
}, AppState> {
    element: React.RefObject<HTMLDivElement>;
    observer: ResizeObserver;
    totalHeight: number;
    state: AppState;
    constructor(props: {
        items: any[];
    });
    push(): void;
    pop(): void;
    shift(): void;
    unshift(): void;
    fill(): void;
    scroller(target: React.UIEvent<HTMLDivElement>): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default VirtualScrolling;
