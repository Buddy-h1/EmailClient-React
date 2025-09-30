import { useEffect, useState } from 'react';

export const useTableHeight = (
	parentContainerRef: React.RefObject<HTMLDivElement | null>,
	tableWrapperRef: React.RefObject<HTMLDivElement | null>,
) => {
	const [tableHeight, setTableHeight] = useState<number>(300);
	const [forceUpdateKey, setForceUpdateKey] = useState(0);

	const getOuterHeightWithMargin = (el: HTMLElement | undefined): number => {
		if (el) {
			const rect = el.getBoundingClientRect();
			const style = window.getComputedStyle(el);

			const marginTop = parseFloat(style.marginTop || '0');
			const marginBottom = parseFloat(style.marginBottom || '0');

			return rect.height + marginTop + marginBottom;
		} else {
			return 0;
		}
	};

	useEffect(() => {
		const tableTitle = tableWrapperRef.current?.querySelector('.ant-table-title') as
			| HTMLElement
			| undefined;

		const tableHeader = tableWrapperRef.current?.querySelector('.ant-table-thead') as
			| HTMLElement
			| undefined;

		const tableFooter = tableWrapperRef.current?.querySelector('.ant-table-footer') as
			| HTMLElement
			| undefined;

		const updateTableHeight = () => {
			const containerHeight = parentContainerRef.current?.offsetHeight;
			const tablePagination = tableWrapperRef.current?.querySelector('.ant-table-pagination') as
				| HTMLElement
				| undefined;

			const tableTitleHeight = tableTitle?.getBoundingClientRect().height || 0;
			const tableHeaderHeight = tableHeader?.getBoundingClientRect().height || 0;
			const tableFooterHeight = getOuterHeightWithMargin(tableFooter);
			const tablePaginationHeight = getOuterHeightWithMargin(tablePagination);

			if (containerHeight) {
				const tableBodyHeight =
					containerHeight -
					tableTitleHeight -
					tableHeaderHeight -
					tableFooterHeight -
					tablePaginationHeight -
					1;

				if (tableBodyHeight !== 0) setTableHeight(tableBodyHeight);
			}
		};

		const containerObserver = new ResizeObserver(updateTableHeight);
		const tableObserver = new ResizeObserver(updateTableHeight);

		if (parentContainerRef.current) {
			containerObserver.observe(parentContainerRef.current);
		}

		if (tableTitle) tableObserver.observe(tableTitle);
		if (tableHeader) tableObserver.observe(tableHeader);
		if (tableFooter) tableObserver.observe(tableFooter);

		return () => {
			containerObserver.disconnect();
			tableObserver.disconnect();
		};
	}, [parentContainerRef, tableWrapperRef, forceUpdateKey]);

	const forceUpdateHeight = () => setForceUpdateKey((prev): number => prev + 1);

	return { tableHeight, forceUpdateHeight };
};
