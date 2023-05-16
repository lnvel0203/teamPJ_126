package springBoot_team_pj_126.controller;
// 부서관리용 컨트롤러 생성(2023-05-04_김희수)

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springBoot_team_pj_126.dto.DeptDTO;
import springBoot_team_pj_126.service.DepartmentService;

@RequestMapping(value="/department")
@RestController
public class DepartmentController {
   
   @Autowired(required = true)
   private DepartmentService service;


   @GetMapping
   public List<DeptDTO> getDepartmentList(HttpServletRequest req, Model model) 
         throws ServletException, IOException{
      System.out.println("<<< 컨트롤러 - 부서리스트 >>>");

      return service.DepartmentList(req, model);
   }
   
   @PostMapping("/addDepartment")
   public void addDepartment(@RequestBody DeptDTO dto)   throws ServletException, IOException{
      System.out.println(dto);
      service.addDepartment(dto);

   }
   
//   // < 5월 9일 김희수 부서 수정  - 추가 >
//   @PutMapping("/editDepartment") 
//   public void departmentUpdate(DeptDTO dto, Model model) 
//         throws ServletException, IOException{ //@RequestBody ==> req.getParameter("dto");
//      //리스트 데이터를 넘긴다. -- 리액트에 넘긴다, 주소는 jsp나 타입리프에 넘기는것이다. 지금은 리액트 화면에 넘기기위해 데이터만 넘긴다.
//      System.out.println("<<< 컨트롤러 - 부서수정 >>>");
//
//      service.editDepartment(dto);
//
//      System.out.println("update [성공]");
//   }
   
   // < 5월 11일 김희수 부서 삭제  - 추가 >
   @DeleteMapping("/deleteDepartment/{deptid}")
   public void deleteDepartment(@PathVariable int deptid)
         throws ServletException, IOException {
      System.out.println("부서번호 : " + deptid);
      System.out.println("<<< 컨트롤러 - 부서삭제 >>>");
      
      service.deleteDepartment(deptid);
   }

   
   // 5월 15일 부장 이름 받아오기
   @GetMapping("/positionData")
   public ArrayList<String> positionData() {
      System.out.println("컨트롤러 - positionData");
      
      ArrayList<String> list = service.positionData();
      System.out.println(list);
      
      return list;
   }
   
   // 부장 업데이트
   @PutMapping("/updatePosition")
   public void updatePosition(@RequestBody Map<String, Object> map){
      System.out.println("컨트롤러 - updatePosition");
      System.out.println(map);
      
      service.updatePosition(map);
   }
}