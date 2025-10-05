import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MiniChartProps {
  data: { price: number }[];
  color: string;
}

const MiniChart = ({ data, color }: MiniChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MiniChart;
