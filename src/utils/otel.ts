import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { trace } from '@opentelemetry/api';

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [SemanticResourceAttributes.SERVICE_NAME]: 'chore-chat',
  }),
  traceExporter: new OTLPTraceExporter({
    url: 'http://otel-collector:4320/v1/traces',
  }),
});

sdk.start();

export const tracer = trace.getTracer('chore-chat');
