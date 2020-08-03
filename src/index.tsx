import React = require("react");

interface AppState {
	items: any[];
	first: number;
	last: number;
}

class VirtualScrolling extends React.Component<{ items: any[] }, AppState> {

	public element: React.RefObject<HTMLDivElement>;
	public observer: ResizeObserver;
	public totalHeight: number;
	public state: AppState;

	constructor(props: { items: any[] }) {
		super(props);

        this.element = React.createRef();
        this.observer = {} as ResizeObserver;
        this.totalHeight = 0;

        this.state = {
			items: this.props.items,
            first: 0,
            last: 0
		}
		
		this.scroller = this.scroller.bind(this);
	}
	
	push() {
        const state = this.state;

        if (state.last < state.items.length) {
            state.last++;

            this.setState(state, () => {
                const child = (this.element.current ? this.element.current.lastChild || {} : {}) as HTMLDivElement;
                if (child) this.totalHeight += child.offsetHeight;
            });
        }
    }

    pop() {
        const state = this.state;

        if (state.last > 0) {
            state.last--;

            const child = (this.element.current ? this.element.current.lastChild || {} : {}) as HTMLDivElement;
            if (child) this.totalHeight -= child.offsetHeight;

            this.setState(state);
        }
    }

    shift() {
        if (this.element.current) {
            const state = this.state;
            const scrollTop = this.element.current.scrollTop;

            if (state.first < (state.last - 1)) {
                state.first++;

                const child = (this.element.current ? this.element.current.firstChild || {} : {}) as HTMLDivElement;
                if (child) this.totalHeight -= child.offsetHeight;

                this.setState(state, () => {
                    // Cheat for async shift/push at the same time
                    // Re-check push
                    if (this.element.current && (scrollTop + this.element.current.offsetHeight) >= this.totalHeight) {
                        this.push();
                    }
                });
            }
        }
    }

    unshift() {
        const state = this.state;

        if (state.first > 0) {
            state.first--;

            this.setState(state, () => {
                const child = (this.element.current ? this.element.current.firstChild || {} : {}) as HTMLDivElement;
                if (child && this.element.current) {
                    this.totalHeight += child.offsetHeight;
                    this.element.current.scrollTop = child.offsetHeight;
                }
            });
        }
	}

    fill() {
        if (this.element.current && this.element.current.offsetHeight > this.totalHeight && this.state.last < (this.state.items.length)) {
            this.push();

            this.fill();
        }
    }
    
    scroller(target: React.UIEvent<HTMLDivElement>) {
		const scrollTop = target.currentTarget.scrollTop;

        if (this.element.current) {
            const firstChild = (this.element.current.firstChild || {}) as HTMLDivElement;
            const lastChild = (this.element.current.lastChild || {}) as HTMLDivElement;

            if ((scrollTop + this.element.current.offsetHeight) >= this.totalHeight) {
                this.push();
            }
            else if (lastChild && (scrollTop + this.element.current.offsetHeight) < (this.totalHeight - lastChild.offsetHeight)) {
                this.pop();
            }

            if (firstChild && scrollTop > firstChild.offsetHeight) {
                this.shift();
            }
            else if (scrollTop === 0 && this.state.first) {
                this.unshift();
            }
        }
	}

    componentDidMount() {
        this.observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                const state = this.state;

                state.first = 0;
                state.last = 0;

                this.setState(state);
        
                this.totalHeight = 0;

                this.fill();
            });
        });

        if (this.element.current) this.observer.observe(this.element.current);
    }

    componentWillUnmount() {
        if (this.element.current) this.observer.unobserve(this.element.current);
	}

	render() {
		const { first, last } = this.state;

		return (
			<div
				style={{ flex: 1, overflow: "auto" }}
				ref={ this.element }
				onScroll={ this.scroller }
			>
				{ this.state.items.slice(first, last).map((item, index) => (
					<div key={ 'item-' + index }>
						{ item }
					</div>
				)) }
			</div>
		);
	}
}

export default VirtualScrolling;
