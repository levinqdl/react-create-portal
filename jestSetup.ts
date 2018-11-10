import * as emotion from 'emotion'
import { createSerializer, createMatchers } from 'jest-emotion'

expect.extend(createMatchers(emotion))
expect.addSnapshotSerializer(createSerializer(emotion))