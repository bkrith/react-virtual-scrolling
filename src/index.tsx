import React = require("react");

interface IState {
	messages: any[],
	first: number,
	last: number,
	avgHeight: number
}

export class VirtualScrolling extends React.Component<{ items: any[]}, IState> {
	public state: IState;
	public observer: ResizeObserver;
	public element: React.RefObject<HTMLDivElement>;
	public totalHeight: number;
	public prevScroll: number;
	public onScroll: any;
	public filling: boolean;

	constructor(props: { items: any[] }) {
		super(props);

		this.element = React.createRef();
		this.observer = {} as ResizeObserver;
		this.totalHeight = 0;
		this.prevScroll = 0;
		this.onScroll = this.scrollEvent.bind(this);
		this.filling = false;

		this.state = {
			messages: this.props.items,
			first: 0,
			last: 0,
			avgHeight: 0
		};

		setInterval(() => {
			if (this.element.current) this.scroller(this.element.current.scrollTop);
		}, 250);
	}

	push() {
		const state = this.state;
		const element = this.element.current;

		if (element && state.last < state.messages.length) {

			state.last++;

			this.setState(state, () => {
				const childHeight = (element.children[element.children.length - 2] || {}).clientHeight || 0;
				this.totalHeight += childHeight;
			});
		}
	}

	pop() {
		const state = this.state;
		const element = this.element.current;

		if (element && state.last > 0) {
			const childHeight = (element.children[element.children.length - 2] || {}).clientHeight || 0;

			state.last--;

			this.totalHeight -= childHeight;

			this.setState(state);
		}
	}

	shift() {
		const state = this.state;
		const element = this.element.current;

		if (element && state.first < (state.last - 1)) {

			state.first++;

			const childHeight = (element.children[state.first ? 1 : 0] || {}).clientHeight || 0;
			this.totalHeight -= childHeight;

			this.setState(state);
        }
	}

	unshift() {
        const state = this.state;
        const element = this.element.current;

        if (element && state.first > 0) {
			state.first--;

            this.setState(state, () => {
				const childHeight = (element.children[state.first ? 1 : 0] || {}).clientHeight || 0;
                this.totalHeight += childHeight;
            });
        }
	}

	fill() {
		const state = this.state;
		const element = this.element.current;

		if (element) {
			if (element.offsetHeight > this.totalHeight && state.last < state.messages.length) {
				this.filling = true;

				state.last++;

				this.setState(state, () => {
					const childHeight = (element.children[element.children.length - 2] || {}).clientHeight || 0;
					this.totalHeight += childHeight;

					this.fill();
				});
			}
			else {
				state.avgHeight = Math.round(this.totalHeight / (Math.abs(state.last - state.first) || 1));
				
				this.setState(state, () => {
					const firstChild = (element.children[state.first ? 1 : 0] || {}) as HTMLDivElement;

					element.scrollTop = Math.abs((firstChild.offsetTop || 0) - element.offsetTop);

					this.filling = false;
				});
			}
		}
	}

    componentDidMount() {
        this.observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
				this.fill();
            });
        });

        if (this.element.current) this.observer.observe(this.element.current);
	}

    componentWillUnmount() {
        if (this.element.current) this.observer.unobserve(this.element.current);
    }
	
	scrollEvent(target: React.UIEvent<HTMLDivElement>) {
		this.scroller(target.currentTarget.scrollTop);
	}

	scroller(scrollTop: number) {
		const state = this.state;
		const element = this.element.current;

		if (element) {
			const firstChild = (element.children[state.first ? 1 : 0] || {}) as HTMLDivElement;
			const firstChildTop = (firstChild.offsetTop || 0) - element.offsetTop;
			const lastChild = (element.children[element.children.length - 2] || {}) as HTMLDivElement;
			const lastChildTop = (lastChild.offsetTop || 0) - element.offsetTop;
			const avgHeight = Math.round(this.totalHeight / (Math.abs(state.last - state.first) || 1));

			if (Math.abs(scrollTop - this.prevScroll) > (avgHeight * 5)) {
				let newPosition = Math.abs(Math.floor(scrollTop / (avgHeight || 1)));

				if (newPosition >= state.messages.length) newPosition = Math.abs(state.messages.length - state.last - state.first - 1);

				state.first = newPosition;
				state.last = state.first;

				this.totalHeight = 0;

				this.setState(state, () => this.fill());
			}
			else if (!this.filling) {
				if ((lastChildTop + lastChild.offsetHeight) <= (scrollTop + element.offsetHeight)) {
					this.push();

					if (scrollTop > (firstChildTop + firstChild.offsetHeight + (avgHeight * 3))) {
						this.shift();
					}
				}
				
				if ((lastChildTop + lastChild.offsetHeight) > (scrollTop + element.offsetHeight + (avgHeight * 3))) {
					this.pop();
					if (scrollTop < (firstChildTop - firstChild.offsetHeight)) {
						this.unshift();
					}
				}
			}

			if (firstChildTop > scrollTop) {
				this.unshift();
			}

			this.prevScroll = scrollTop;
		}
	}

	render() {
		const state = this.state;

		return (
			<div
				ref={ this.element }
				style={{
					flex: 1,
					overflow: "auto"
				}}
				onScroll = { this.onScroll }
			>
				{ state.first ? <div key={ 'top-1' } className="placeholder-content" style={{ height: (state.avgHeight * state.first) + 'px' }}></div> : '' }
				
				{state.messages.slice(state.first, state.last).map((m, index) => (
					<div key={ 'vsItem-' + index}>
						{ m }
					</div>
				))}

				{ <div key={ 'bot-1' } className="placeholder-content" style={{ height: (state.avgHeight * (state.messages.length - state.last)) + 'px' }}></div> }
			</div>
		);
	}
}
