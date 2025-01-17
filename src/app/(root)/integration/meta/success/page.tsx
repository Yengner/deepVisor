import MetaIntegrationSuccess from '@/components/integration/MetaIntegrationSuccess';
import { Suspense } from 'react';

export default function MetaSuccessPage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <MetaIntegrationSuccess />
        </Suspense>
    );
}
