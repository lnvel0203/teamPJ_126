package springBoot_team_pj_126.controller;

import java.io.IOException;

import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import springBoot_team_pj_126.dto.SalaryDTO;
import springBoot_team_pj_126.service.SalaryService;



@RequestMapping(value="/members")
@RestController
public class SalaryController {

   
   
   @Autowired(required=true)
   private SalaryService service;
   //http://localhost:8081/members   
   //localhost:8080/members =>가 첫 url인데
   
   @GetMapping("/salary")
   public List<SalaryDTO> SalaryList(HttpServletRequest req, Model model) 
         throws ServletException, IOException{
      System.out.println("컨트롤러 - Salary");
      List<SalaryDTO> list = service.salaryList(req, model);
      System.out.println("컨트롤러 : list : " + list);
      return service.salaryList(req, model);
   }
   

   @PostMapping("/insertSalary")
   public void InsertSalary(@RequestBody SalaryDTO salary) throws ServletException, IOException{
      System.out.println("컨트롤러 - insertSalary");
      mapper.insertSalary(salary);
      System.out.println("insert [성공]");
   }
   
   

   @PostMapping("/updateSalary")
   public void login(@RequestBody SalaryDTO salary) throws ServletException, IOException{
      System.out.println("컨트롤러 - updateSalary");
      mapper.updateSalary(salary);
      System.out.println("update [성공]");
      
   }
   

   @PostMapping("/deleteSalary")
   public void login(@RequestBody SalaryDTO salary) throws ServletException, IOException{
      System.out.println("컨트롤러 - deleteSalary");
      mapper.deleteSalary(salary);
      System.out.println("delete [성공]");
      
   }
//   
//   
//   
//   
//   //!!!! 반드시 @RequestBody를 쓰는 이유를 알아야만 리액트를 쓸수있다.
//   //url 상에 추가된것! put공부하기
//   @PutMapping("/{id}") //-> @PathVariale로 받는다
//   public void memberUpdate(@PathVariable int id, @RequestBody MemberDTO member) throws ServletException, IOException{ //@RequestBody ==> req.getParameter("dto");
//      //리스트 데이터를 넘긴다. -- 리액트에 넘긴다, 주소는 jsp나 타입리프에 넘기는것이다. 지금은 리액트 화면에 넘기기위해 데이터만 넘긴다.
//      System.out.println("컨트롤러 - update");
//      mservice.updateMember(member);
//      
//      System.out.println("update [성공]");
//      
//   }
//   //주의 사항 - 엑소시오 의 능력과 restAPI에 대해서 알아보기
//   @DeleteMapping("/{id}") 
//   public void memberDelete(@PathVariable int id) throws ServletException, IOException{
//      
//      System.out.println("컨트롤러 - delete");
//      mservice.deleteMember(id);
//      
//      System.out.println("delete [성공]");
//      
//   }

   
}