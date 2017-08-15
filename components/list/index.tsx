import React, { Component } from 'react';
import classNames from 'classnames';

import Spin from '../spin';
import Icon from '../icon';
import Pagination from '../pagination';
import Button from '../button';
import { Row } from '../grid';

import Item from './Item';

export interface ListGridType {
  gutter?: number;
  column?: number;
}

export interface ListProps {
  bordered?: boolean;
  className?: string;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  id?: string;
  itemLayout: string;
  loading?: boolean;
  showLoadMore?: boolean;
  loadingMore?: boolean;
  onLoadMore?: React.FormEventHandler<any>;
  pagination?: any;
  prefixCls?: string;
  grid?: ListGridType;
  noHovering: boolean;
  style?: React.CSSProperties;
}

export default class List extends Component<ListProps> {
  static Item: typeof Item = Item;

  render() {
    const {
      bordered = true,
      className,
      children,
      loading = false,
      itemLayout,
      showLoadMore = false,
      loadingMore = false,
      noHovering = false,
      onLoadMore = (() => {
      }),
      pagination = false,
      prefixCls = 'ant-list',
      grid,
      } = this.props;

    const classString = classNames(prefixCls, className, {
      [`${prefixCls}-vertical`]: itemLayout === 'vertical',
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-grid`]: grid,
      [`${prefixCls}-hovering`]: !noHovering,
    });

    const moreButton = (
      <Button onClick={onLoadMore}>
        <Icon type="loading"/>
        加载中...
      </Button>
    );

    const moreContent = (
      <div className={`${prefixCls}-more`}>
        {loadingMore ? moreButton : <Button onClick={onLoadMore}>加载更多...</Button>}
      </div>
    );

    const paginationContent = (
      <div className={`${prefixCls}-pagination`}>
        <Pagination {...pagination} />
      </div>
    );

    const loadingContent = (
      <div className={`${prefixCls}-spin`}>
        <Spin />
      </div>
    );

    const childrenContent = grid ? (
      <Row gutter={grid.gutter}>
        {React.Children.map(children, (element: React.ReactElement<any>) => React.cloneElement(element, { grid }))}
      </Row>
    ) : children;

    return (
      <div className={classString}>
        {loading && loadingContent}
        {!loading && childrenContent}
        {!loading && showLoadMore && moreContent}
        {(!showLoadMore && pagination) && paginationContent}
      </div>
    );
  }
}