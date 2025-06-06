import { Request, Response } from "express";
import { Professor } from "../models/Professor";
import { Op } from "sequelize";
import bcrypt from 'bcrypt';
import { Disciplina } from "../models/Disciplina";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "senha";

export const listarProfessores = async (req: Request, res: Response): Promise<any> => {
  const professor = await Professor.findAll();
  res.status(200).json(professor);
};

export const cadastrarProfessor = async (req: Request, res: Response): Promise<any> => {
  const { nome, email, matricula, senha } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);
  try {
    const novoProfessor = await Professor.create({
      nome,
      email,
      matricula,
      senha: hashedPassword,
      tipo: "professor"
    });
    res.status(201).json({
      message: "Professor cadastrado com sucesso",
      novoProfessor,
    });
  } catch (error) {
    console.error("Erro ao cadastrar professor:", error);
    res.status(400).json({ error: "Erro ao cadastrar professor" });
  }
};


export const buscarProfessor = async (req: Request, res: Response): Promise<any> => {
  try {
    const { professorId } = req.params;

    const professor = await Professor.findByPk(professorId);
    if (!professor) {
      return res.status(404).json({ error: "professor não encontrado" }); // Retorno após o envio da resposta
    }

    res.status(200).json(professor); // Retorno após o envio da resposta
  } catch (error) {
    console.error("Erro ao buscar professor:", error);
    return res.status(500).json({ error: "Erro interno do servidor" }); // Retorno após o envio da resposta
  }
};


export const atualizarProfessor = async (req: Request, res: Response): Promise<any> => {
  try {
    const { professorId } = req.params;
    const dadosAtualizados = req.body;

    const resultado = await pegarProfessor(professorId);
    const professor = resultado?.professor;

    if (!professor) {
      res.status(404).json({ message: resultado.message });
    }

    await professor?.update(dadosAtualizados, {
      fields: Object.keys(dadosAtualizados),
    });

    res
      .status(200)
      .json({
        message: "Professor atualizado com sucesso",
        professor: professor,
      });
  } catch (error) {
    console.error("Erro ao atualizar professor:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const deletarProfessor = async (req: Request, res: Response): Promise<any> => {
  try {
    const { professorId } = req.params;

    const resultado = await pegarProfessor(professorId);
    const professor = resultado?.professor;

    if (!professor) {
      res.status(404).json({ message: resultado.message + " ou já deletado" });
    }

    const disciplina = await Disciplina.findOne({
      where: { professorId: professor?.id },
    });

    if (disciplina) {
      res
        .status(400)
        .json({
          message:
            "Professor ainda cadastrado em uma disciplina, não pode ser excluído",
        });
    }

    await professor?.destroy();
    res
      .status(200)
      .json({
        message: "Professor deletado com sucesso",
        professor: professor,
      });
  } catch (error) {
    console.error("Erro ao deletar professor:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const listarProfessoresDeletados = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const professores = await Professor.findAll({
      where: {
        deletedAt: {
          [Op.not]: null,
        },
      },
      paranoid: false,
    });

    res.status(200).json(professores);
  } catch (error) {
    console.error("Erro ao listar professors deletados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const recuperarProfessor = async (req: Request, res: Response): Promise<any> => {
  try {
    const { alunoId: professorId } = req.params;

    const resultado = await pegarProfessor(professorId);
    const professor = resultado?.professor;

    if (!professor) {
      res.status(404).json({ message: resultado.message });
    }

    await professor?.restore();
    res
      .status(200)
      .json({
        message: "Professor recuperado com sucesso",
        professor: professor,
      });
  } catch (error) {
    console.error("Erro ao recuperar professor:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const pegarProfessor = async (professorId: string): Promise<any> => {
  try {
    const professor = await Professor.findByPk(professorId, {
      paranoid: false,
    });

    if (professor) {
      return {
        message: "Professor encontrado com sucesso",
        professor: professor,
      };
    } else {
      return { message: "Professor não encontrado" };
    }
  } catch (error) {
    console.error("Erro ao buscar professor:", error);
    return { message: "Erro ao buscar professor", error };
  }
};

export const loginProfessor = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, matricula } = req.body;

  console.log("📬 Requisição de login recebida");
  console.log("📦 Dados recebidos:", { email, matricula });

  if (!email || !matricula) {
    console.warn("⚠️ Email ou matrícula não informados");
    return res.status(400).json({ error: "Informe e-mail e matrícula" });
  }

  try {
    console.log("🔎 Buscando professor no banco de dados...");
    const professor = await Professor.findOne({ where: { email, matricula } });

    if (!professor) {
      console.warn("🚫 Professor não encontrado ou dados inválidos");
      return res
        .status(401)
        .json({ error: "Professor não encontrado ou dados inválidos" });
    }

    console.log("✅ Professor encontrado:", professor.dataValues);

    const payload = {
      id: professor.id,
      nome: professor.nome,
      email: professor.email,
      matricula: professor.matricula,
    };

    console.log("⚙️ Gerando token com payload:", payload);
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });

    console.log("🔑 Token gerado com sucesso");
    return res.json({
      token,
      mensagem: "Professor logado com sucesso",
    });
  } catch (error) {
    console.error("🔥 Erro ao realizar login:", error);
    return res.status(500).json({ error: "Erro ao realizar login" });
  }
};
