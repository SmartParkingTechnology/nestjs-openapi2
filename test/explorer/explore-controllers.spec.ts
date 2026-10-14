import { Controller, Get } from '@nestjs/common';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation
} from '../../lib/decorators';
import { SwaggerExplorer } from '../../lib/swagger-explorer';

describe('Explore controllers', () => {
  class Foo {}

  @Controller('')
  class FooController {
    @Get('foos/:objectId')
    @ApiOperation({ title: 'List all Foos' })
    @ApiOkResponse({ type: Foo })
    find(): Promise<Foo> {
      return Promise.resolve({});
    }
  }

  it('sees a controller operation and its 200 response', () => {
    const explorer = new SwaggerExplorer();
    const routes = explorer.exploreController(
      {
        instance: new FooController(),
        metatype: FooController
      } as InstanceWrapper<FooController>,
      'path'
    );

    expect(routes.length).toEqual(1);
    expect(routes[0].root.method).toEqual('get');
    expect(routes[0].root.path).toEqual('/path/foos/{objectId}');
    expect(routes[0].root.summary).toEqual('List all Foos');
  });

  it('leaves out endpoints marked as excluded', () => {
    @Controller('')
    class BarController {
      @Get('bars')
      @ApiOperation({ title: 'List all Bars' })
      list(): Promise<Foo[]> {
        return Promise.resolve([]);
      }

      @Get('bars/hidden')
      @ApiExcludeEndpoint()
      hidden(): Promise<Foo> {
        return Promise.resolve({});
      }
    }

    const explorer = new SwaggerExplorer();
    const routes = explorer.exploreController(
      {
        instance: new BarController(),
        metatype: BarController
      } as InstanceWrapper<BarController>,
      'path'
    );

    expect(routes.length).toEqual(1);
    expect(routes[0].root.path).toEqual('/path/bars');
    expect(routes[0].root.summary).toEqual('List all Bars');
  });
});
