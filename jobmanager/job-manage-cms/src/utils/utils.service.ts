import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HASH_ROUND } from 'src/common/constants/global.constant';
@Injectable()
export class UtilsService {
  async encryptText(plain: string, hashRound: number = HASH_ROUND) {
    const salt = await bcrypt.genSalt(hashRound);
    return await bcrypt.hash(plain, salt);
  }

  async compareHash(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
  }
}
