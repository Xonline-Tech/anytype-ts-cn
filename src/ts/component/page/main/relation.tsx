import * as React from 'react';
import { observer } from 'mobx-react';
import { Header, Footer, Loader, ListObject, Deleted } from 'Component';
import { I, C, Action, UtilCommon, UtilObject, UtilRouter, translate, UtilDate } from 'Lib';
import { detailStore, dbStore, commonStore } from 'Store';
import Errors from 'json/error.json';
import HeadSimple from 'Component/page/head/simple';

interface State {
	isDeleted: boolean;
};

const PageMainRelation = observer(class PageMainRelation extends React.Component<I.PageComponent, State> {

	id = '';
	refHeader: any = null;
	refHead: any = null;
	loading = false;

	state = {
		isDeleted: false,
	};

	constructor (props: I.PageComponent) {
		super(props);

		this.onCreate = this.onCreate.bind(this);
	};

	render () {
		if (this.state.isDeleted) {
			return <Deleted {...this.props} />;
		};

		if (this.loading) {
			return <Loader id="loader" />;
		};

		const rootId = this.getRootId();
		const object = detailStore.get(rootId, rootId);
		const subIdType = dbStore.getSubId(rootId, 'type');
		const totalType = dbStore.getMeta(subIdType, '').total;
		const subIdObject = dbStore.getSubId(rootId, 'object');
		const totalObject = dbStore.getMeta(subIdObject, '').total;
		const columnsObject: any[] = [
			{ 
				relationKey: 'lastModifiedDate', name: translate('commonUpdated'),
				mapper: (v: any) => UtilDate.date(UtilDate.dateFormat(I.DateFormat.MonthAbbrBeforeDay), v),
			},
			{ relationKey: object.relationKey, name: object.name, isCell: true }
		];

		const filtersType: I.Filter[] = [
			{ operator: I.FilterOperator.And, relationKey: 'spaceId', condition: I.FilterCondition.Equal, value: object.spaceId },
			{ operator: I.FilterOperator.And, relationKey: 'layout', condition: I.FilterCondition.Equal, value: I.ObjectLayout.Type },
			{ operator: I.FilterOperator.And, relationKey: 'recommendedRelations', condition: I.FilterCondition.In, value: [ rootId ] },
		];
		const filtersObject: I.Filter[] = [
			{ operator: I.FilterOperator.And, relationKey: 'spaceId', condition: I.FilterCondition.Equal, value: object.spaceId },
		];

		return (
			<div>
				<Header component="mainObject" ref={ref => this.refHeader = ref} {...this.props} rootId={rootId} />

				<div className="blocks wrapper">
					<HeadSimple ref={ref => this.refHead = ref} type="Relation" rootId={rootId} onCreate={this.onCreate} />

					<div className="section set">
						<div className="title">{totalType} {UtilCommon.plural(totalType, translate('pluralType'))}</div>
						<div className="content">
							<ListObject subId={subIdType} rootId={rootId} columns={[]} filters={filtersType} />
						</div>
					</div>

					{object.isInstalled ? (
						<div className="section set">
							<div className="title">{totalObject} {UtilCommon.sprintf(translate('pageMainRelationObjectsCreated'), UtilCommon.plural(totalObject, translate('pluralObject')))}</div>
							<div className="content">
								<ListObject sources={[ rootId ]} subId={subIdObject} rootId={rootId} columns={columnsObject} filters={filtersObject} />
							</div>
						</div>
					) : ''}
				</div>

				<Footer component="mainObject" {...this.props} />
			</div>
		);
	};

	componentDidMount () {
		this.open();
	};

	componentDidUpdate () {
		this.open();
	};

	componentWillUnmount () {
		this.close();
	};

	open () {
		const rootId = this.getRootId();

		if (this.id == rootId) {
			return;
		};

		this.id = rootId;
		this.loading = true;
		this.forceUpdate();
		
		C.ObjectOpen(rootId, '', UtilRouter.getRouteSpaceId(), (message: any) => {
			if (message.error.code) {
				if (message.error.code == Errors.Code.NOT_FOUND) {
					this.setState({ isDeleted: true });
				} else {
					UtilObject.openHome('route');
				};
				return;
			};

			const object = detailStore.get(rootId, rootId, []);
			if (object.isDeleted) {
				this.setState({ isDeleted: true });
				return;
			};

			this.loading = false;
			this.forceUpdate();

			if (this.refHeader) {
				this.refHeader.forceUpdate();
			};
			if (this.refHead) {
				this.refHead.forceUpdate();
			};
		});
	};

	close () {
		const { isPopup, match } = this.props;
		const rootId = this.getRootId();
		
		let close = true;
		if (isPopup && (match.params.id == rootId)) {
			close = false;
		};
		if (close) {
			Action.pageClose(rootId, true);
		};
	};

	getRootId () {
		const { rootId, match } = this.props;
		return rootId ? rootId : match.params.id;
	};

	onCreate () {
		const rootId = this.getRootId();
		const object = detailStore.get(rootId, rootId);

		C.ObjectCreateSet([ rootId ], { name: object.name + ' set' }, '', commonStore.space, (message: any) => {
			if (!message.error.code) {
				UtilObject.openPopup(message.details);
			};
		});
	};

});

export default PageMainRelation;
