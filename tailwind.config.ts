import type { Config } from 'tailwindcss';
export default { content: ['./apps/web/app/**/*.{ts,tsx}', './apps/web/components/**/*.{ts,tsx}', './packages/ui/**/*.{ts,tsx}'], theme: { extend: { colors: { ink:'#142b32', teal:'#087c70', cream:'#f8f8f2' } } }, plugins: [] } satisfies Config;
