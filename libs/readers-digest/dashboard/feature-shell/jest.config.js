module.exports = {
  name: 'readers-digest-dashboard-feature-shell',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/readers-digest/dashboard/feature-shell',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
