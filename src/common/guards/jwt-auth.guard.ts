import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Store secret in environment variables
    });
  }

  async validate(payload: any) {
    // Validate the payload (e.g., check if user exists in database)
    // The payload is the decoded JWT, containing user data like id, email, etc.
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token');
    }
    return { userId: payload.sub, email: payload.email }; // Attach user data to request
  }
}
