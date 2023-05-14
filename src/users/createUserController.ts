import KakaoLoginService from "../../shared/Oauth/kakaoService"
import { CreateUserByKaKaoUseCase } from "./createUserByKaKaoUseCase";
import { UserRepository } from "./createUserRepository";
import { CreateUserDTO } from "./dtos/createUserDTO";
import {CreateUserUseCase} from "./createUserUseCase";

class CreateUserByKakaoController {
  private kakaoLoginService: KakaoLoginService;
  private createUserByKakaoUseCase: CreateUserByKaKaoUseCase;
  private createUserUseCase: CreateUserUseCase;

  constructor(kakaoLoginService: KakaoLoginService, createUserByKakaoUseCase: CreateUserByKaKaoUseCase, createUserUseCase: CreateUserUseCase) {
    this.kakaoLoginService = kakaoLoginService;
    this.createUserByKakaoUseCase = createUserByKakaoUseCase
    this.createUserUseCase = createUserUseCase
  }

  async executeImpl(dto: CreateUserDTO) {
    const { email, phone, password } = dto

    if (!email && !phone) {
        throw new Error("이메일 또는 전화번호를 입력해주세요")
    }

    if (!password) {
        throw new Error("비밀번호를 입력해주세요")
    }

    return await this.createUserUseCase.execute(dto)
  }

  async createUserByKakao(code: string): Promise<void> {
    try {
      // 카카오 로그인 서비스를 사용하여 사용자 정보를 가져옵니다.
      const kakaoUserInfo = await this.kakaoLoginService.handleKakaoLogin(code);

      // 사용자 정보를 이용해 새로운 사용자를 생성합니다.
      // 예를 들어, kakaoUserInfo에서 사용자 이름과 이메일을 추출해 사용할 수 있습니다.
      const username = kakaoUserInfo.kakao_account.profile.nickname;
      const email = kakaoUserInfo.kakao_account.email;

      // CreateUserDTO 객체를 생성합니다.
      const userDTO: CreateUserDTO = {
        email: email,
        password: Math.random().toString(36).slice(-8), // 무작위 비밀번호 생성
      };

      // CreateUserByKakaoUseCase의 execute 메서드를 호출하여 사용자를 생성합니다.
      await this.createUserByKakaoUseCase.execute(userDTO);

      console.log("카카오 로그인 성공");
    } catch (error) {
      console.error("카카오 로그인에 실패했습니다", error);
      throw new Error("CreateUserByKakaoController: Failed to create user");
    }
  }
}

export default CreateUserByKakaoController;
