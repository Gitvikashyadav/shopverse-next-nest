import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AiService } from './ai.service';

import { GenerateDescriptionOutput } from './dto/generate-description.output';
import { GenerateDescriptionInput } from './dto/generate-description.input';

@Resolver()
export class AiResolver {
  constructor(private readonly aiService: AiService) {}

  @Mutation(() => GenerateDescriptionOutput)
  async generateDescription(
    @Args('generateDescriptionInput')
    generateDescriptionInput: GenerateDescriptionInput,
  ) {
    const description = await this.aiService.generateDescription(
      generateDescriptionInput.name,
      generateDescriptionInput.price,
    );
    return { description };
  }
}
