const demoScreen = {
  font: {
    size: 'font size {{size}}',
    weight: 'font weight {{weight}}',
    preset: 'font preset {{preset}}',
  },
  button: {
    variant: '{{variant}}',
    variantWithOpts: '{{variant}} with {{opts}}',
  },
};

export default demoScreen;
export type DemoTranslations = typeof demoScreen;
