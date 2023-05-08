package springBoot_team_pj_126.controller;
// 부서관리용 컨트롤러 생성(2023-05-04)

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springBoot_team_pj_126.dto.DeptDTO;

@RequestMapping (value="/department")
@RestController
public class DepartmentController {

   @GetMapping
   public List<DeptDTO> getDepartmentList(HttpServletRequest req, Model model) 
         throws ServletException, IOException{
      
      System.out.println("컨트롤러 - memberList");
      
      return null;
   }
   
//   @PostMapping("/editEmployee")
   public void addDepartment(DeptDTO dto, Model model) 
         throws ServletException, IOException{ //@RequestBody ==> req.getParameter("dto");
      //리스트 데이터를 넘긴다. -- 리액트에 넘긴다, 주소는 jsp나 타입리프에 넘기는것이다. 지금은 리액트 화면에 넘기기위해 데이터만 넘긴다.
      System.out.println("컨트롤러 - memberUpdate");
      System.out.println(dto);
      
   }
   
}