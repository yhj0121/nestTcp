import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InfoService } from '../service/info.service';
import { Info } from '../dto/info.entity';

@Resolver(() => Info)
export class InfoResolver {
  constructor(private readonly infoService: InfoService) {}

  @Mutation(() => Info)
  // createInfo(@Args('createInfoInput') createInfoInput: CreateInfoInput) {
  //   return this.infoService.create(createInfoInput);
  // }
  @Query(() => [Info], { name: 'info' })
  findAll() {
    return this.infoService.findAll();
  }

  @Query(() => Info, { name: 'info' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.infoService.findOne(id);
  }

  @Mutation(() => Info)
  // updateInfo(@Args('updateInfoInput') updateInfoInput: UpdateInfoInput) {
  //   return this.infoService.update(updateInfoInput.id, updateInfoInput);
  // }
  @Mutation(() => Info)
  removeInfo(@Args('id', { type: () => Int }) id: number) {
    return this.infoService.remove(id);
  }
}
