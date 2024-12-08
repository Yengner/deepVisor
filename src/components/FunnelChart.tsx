import { FunnelChart, Funnel, LabelList } from 'recharts';

const FunnelGraph = ({ data }) => {
  return (
    <FunnelChart width={400} height={300}>
      <Funnel dataKey="value" data={data} isAnimationActive>
        <LabelList position="inside" fill="#fff" stroke="none" dataKey="step" />
      </Funnel>
    </FunnelChart>
  );
};

export default FunnelGraph;
