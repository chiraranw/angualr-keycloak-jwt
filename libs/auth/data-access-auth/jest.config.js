module.exports = {
  name: 'auth-data-access-auth',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/auth/data-access-auth',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
