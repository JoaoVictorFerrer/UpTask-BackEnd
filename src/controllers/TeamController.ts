
import type { Request,Response } from "express"
import Project from "../models/Project"
import User from "../models/User"



export class TeamMemberController {

     static getProjectTeam = async (req : Request,res : Response) =>{
            const project = await Project.findById(req.project.id).populate({
                path: 'team',
                select:' name id email'
            })
            res.json(project.team)
     }
    
        static findMemberByEmail = async (req : Request,res : Response) =>{
                const {email} = req.body
    
                //Find User
                const user = (await User.findOne({email}).select('name email id'))
                if(!user){
                    const error = new Error('Usuario no encontrado')
                   return res.status(404).json({error:error.message})
                }
                res.json(user)
    
        }
    
        static addMemberById = async (req : Request,res : Response) =>{
            const {id} = req.body
            const user = await User.findById(id).select('id')
            if(!user){
                const error = new Error('Ussuario no encontrado')
               return res.status(404).json({error:error.message})
            }

            if(req.project.team.some(team => team.toString() === user.id.toString())){
                const error = new Error('Este Usuario ya existe en este proyecto')
                return res.status(409).json({error:error.message})
            }
                req.project.team.push(user.id)
                await req.project.save()
                res.send('Usuario Agregado Correctamente')
        }

        static removeMemberById = async (req : Request,res : Response) =>{
            const {idUser} = req.params

            if(!req.project.team.some(team => team.toString() === idUser.toString())){
                const error = new Error('El Usuario no existe en este proyecto')
                return res.status(409).json({error:error.message})
            }
                req.project.team = req.project.team.filter( teamMember => teamMember.toString() !== idUser)
                await req.project.save()
                res.send('Usuario Eliminado Correctamente')
        }
}