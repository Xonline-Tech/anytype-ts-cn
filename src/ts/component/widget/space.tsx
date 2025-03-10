import * as React from 'react';
import { observer } from 'mobx-react';
import { IconObject, ObjectName } from 'Component';
import { I, C, UtilObject, translate } from 'Lib';
import { popupStore, commonStore } from 'Store';
	
const WidgetSpace = observer(class WidgetSpace extends React.Component<I.WidgetComponent> {

	constructor (props: I.WidgetComponent) {
		super(props);

		this.onOpenSettings = this.onOpenSettings.bind(this);
		this.onUpload = this.onUpload.bind(this);
	};

	render (): React.ReactNode {
		const space = UtilObject.getSpaceview();

		return (
			<div className="body" onClick={this.onOpenSettings}>
				<IconObject 
					id="widget-space-icon" 
					object={{ ...space, layout: I.ObjectLayout.SpaceView }} 
					forceLetter={true} 
					size={36}
					canEdit={true} 
					onUpload={this.onUpload}
					menuParam={{ className: 'fixed' }}
				/>
				<div className="txt">
					<ObjectName object={space} />
					{space && !space._empty_ ? <div className="type">{translate(`spaceType${space.spaceType}`)}</div> : ''}
				</div>
			</div>
		);
	};

	onOpenSettings (e: React.MouseEvent) {
		e.stopPropagation();

		popupStore.open('settings', { data: { page: 'spaceIndex', isSpace: true }, className: 'isSpace' });
	};

	onUpload (hash: string) {
		C.WorkspaceSetInfo(commonStore.space, { iconImage: hash });
	};

});

export default WidgetSpace;