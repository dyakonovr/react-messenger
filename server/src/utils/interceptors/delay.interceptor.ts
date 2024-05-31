import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable()
export class DelayInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const delayTime = 3000; // 3 секунды
    return next.handle().pipe(delay(delayTime));
  }
}
