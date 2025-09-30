import { categoryMapRu, type Letter } from '@/entities/letter';
import { Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export const columns = (): ColumnsType<Letter> => [
	{
		dataIndex: 'from',
		width: 250,
		render: (_, { category, from, to }) => {
			if (category === 'sent' || category === 'draft') {
				return <Typography.Text strong>{`Кому: ${to}`}</Typography.Text>;
			} else if (category === 'inbox') {
				return <Typography.Text strong>{`От кого: ${from}`}</Typography.Text>;
			}
		},
	},
	{
		dataIndex: 'category',
		width: 120,
		align: 'center',
		onFilter: (value, record) => record.category === value,
		render: (_, { category }) => {
			let color = 'default';
			let label = '';
			switch (category) {
				case 'inbox':
					color = 'blue';
					label = categoryMapRu['inbox'];
					break;
				case 'sent':
					color = 'green';
					label = categoryMapRu['sent'];
					break;
				case 'draft':
					color = 'orange';
					label = categoryMapRu['draft'];
					break;
			}
			return <Tag color={color}>{label}</Tag>;
		},
	},
	{
		dataIndex: 'subject',
		render: (_, { subject, body }) => (
			<Typography.Text ellipsis>{`${subject || '<Без темы>'} — ${body}`}</Typography.Text>
		),
	},
	{
		dataIndex: 'date',
		width: 110,
		align: 'right',
		render: (date: string) => new Date(date).toLocaleDateString(),
	},
];
