import * as React from 'react';
import { getEmojiDataFromNative, Emoji } from 'emoji-mart';
import { Icon } from 'ts/component';
import { commonStore } from 'ts/store';
import { I } from 'ts/lib';

interface Props {
	id?: string;
	icon: string;
	size?: number;
	className?: string;
	canEdit?: boolean;
	offsetX?: number;
	offsetY?: number;
	onSelect?(id: string): void;
};

interface State {
	icon: string;
};

const EmojiData = require('emoji-mart/data/apple.json');

class Smile extends React.Component<Props, State> {
	
	private static defaultProps = {
		offsetX: 0,
		offsetY: 0,
		size: 18
	};
	
	state = {
		icon: ''
	};
	
	constructor (props: any) {
		super(props);
		
		this.onClick = this.onClick.bind(this);
	};
	
	render () {
		const { id, size, className, canEdit } = this.props;
		const icon = String(this.state.icon || this.props.icon || '');
		
		let cn = [ 'smile' ];
		if (className) {
			cn.push(className);
		};
		if (canEdit) {
			cn.push('canEdit');
		};
		
		let data: any = null;
		if (icon) {
			data = getEmojiDataFromNative(icon, 'apple', EmojiData);
		};
		
		return (
			<div id={id} className={cn.join(' ')} onClick={this.onClick}>
				{data ? <Emoji native={true} emoji={data.colons} set="apple" size={size} /> : <Icon className="blank" />}
			</div>
		);
	};
	
	onClick (e: any) {
		const { id, canEdit, offsetX, offsetY, onSelect } = this.props;
		
		if (!id || !canEdit) {
			return;
		};
		
		commonStore.menuOpen('smile', { 
			element: '#' + id,
			type: I.MenuType.Vertical,
			offsetX: offsetX,
			offsetY: offsetY,
			vertical: I.MenuDirection.Bottom,
			horizontal: I.MenuDirection.Left,
			data: {
				onSelect: (id: string) => {
					this.setState({ icon: String(id || '') });
					onSelect(id);
				}
			}
		});
	};
	
};

export default Smile;