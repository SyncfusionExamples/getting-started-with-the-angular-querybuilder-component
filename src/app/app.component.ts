import { Component, ViewChild } from '@angular/core';
import {employeeData} from './data'
import { QueryBuilderComponent, RuleChangeEventArgs } from '@syncfusion/ej2-angular-querybuilder';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DataManager, Query, Predicate, ReturnOption } from '@syncfusion/ej2-data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myangularproject';

  @ViewChild('queryBuilder') qryBldrObj !: QueryBuilderComponent;
  @ViewChild('dataGrid') gridObj !: GridComponent;
  gridDataSource: object[] = employeeData;
  values: string[] = ['Mr.', 'Mrs.'];

  public rules: object = {
    'condition': 'or',
    'rules': [{
      label: 'Title',
      field: 'Title',
      type: 'string',
      operator: 'endswith',
      value: 'Representative'
    }]
  }

  public updateRule(args: RuleChangeEventArgs){
    let predicate: Predicate = this.qryBldrObj.getPredicate(args.rule);
    let filtrdDataSource: object[] = [];
    let dataManagerQry: Query;
    if( typeof predicate === undefined && predicate === null){
      dataManagerQry = new Query().select(['EmployeeID', 'FirstName', 'TitleOfCourtesy', 'Title', 'HireDate', 'Country', 'City'])
    } else {
      dataManagerQry = new Query().select(['EmployeeID', 'FirstName', 'TitleOfCourtesy', 'Title', 'HireDate', 'Country', 'City']).where(predicate)
    }
    new DataManager(employeeData)
    .executeQuery(dataManagerQry)
    .then(
      (e: ReturnOption) => {
        (<Object[]>e.result).forEach((data: Object) => {
            filtrdDataSource.push(data);
        })
      });
    this.gridDataSource = filtrdDataSource;
    this.gridObj.refresh();
  }

  public onGridCreated(){
    this.updateRule({ rule: this.qryBldrObj.getValidRules(this.qryBldrObj.rule)});
  }
}
